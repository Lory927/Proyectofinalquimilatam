import type { MoleculeStructure } from '@/app/models/chemistry';

export interface LaidOutAtom {
  symbol: string;
  x: number;
  y: number;
}

export interface LaidOutBond {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  order: 1 | 2 | 3;
}

export interface MoleculeLayout {
  width: number;
  height: number;
  atoms: LaidOutAtom[];
  bonds: LaidOutBond[];
}

const VIEW_WIDTH = 240;
const VIEW_HEIGHT = 200;
const PADDING = 32;
const MAX_SCALE = 70;
const WATER_LIKE_ANGLE = (104.5 * Math.PI) / 180;
const LINEAR_ANGLE = Math.PI;
const ROOT_DIRECTION = -Math.PI / 2;

interface QueueItem {
  index: number;
  direction: number;
  isRoot: boolean;
}

interface Point {
  x: number;
  y: number;
}

function childDirections(base: number, count: number, isRoot: boolean, allDouble: boolean): number[] {
  if (count === 1) {
    return [base];
  }
  if (isRoot && count === 2) {
    const spread = allDouble ? LINEAR_ANGLE : WATER_LIKE_ANGLE;
    return [base - spread / 2, base + spread / 2];
  }
  const step = (2 * Math.PI) / Math.max(count, 3);
  return Array.from({ length: count }, (_, i) => base + (i - (count - 1) / 2) * step);
}

function placeAtoms(structure: MoleculeStructure): (Point | undefined)[] {
  const neighbours = structure.atoms.map(() => [] as { index: number; order: number }[]);
  structure.bonds.forEach(({ from, to, order }) => {
    neighbours[from].push({ index: to, order });
    neighbours[to].push({ index: from, order });
  });

  const points: (Point | undefined)[] = structure.atoms.map(() => undefined);
  points[0] = { x: 0, y: 0 };
  const visited = new Set<number>([0]);
  const queue: QueueItem[] = [{ index: 0, direction: ROOT_DIRECTION, isRoot: true }];

  while (queue.length > 0) {
    const item = queue.shift() as QueueItem;
    const origin = points[item.index] as Point;
    const children = neighbours[item.index].filter((neighbour) => !visited.has(neighbour.index));
    children.forEach((child) => visited.add(child.index));

    const allDouble = children.length > 0 && children.every((child) => child.order === 2);
    const directions = childDirections(item.direction, children.length, item.isRoot, allDouble);

    children.forEach((child, i) => {
      const direction = directions[i];
      points[child.index] = {
        x: origin.x + Math.cos(direction),
        y: origin.y + Math.sin(direction),
      };
      queue.push({ index: child.index, direction, isRoot: false });
    });
  }

  return points;
}

export function layoutMolecule(structure: MoleculeStructure): MoleculeLayout {
  const points = placeAtoms(structure);
  const placed = points.filter((point): point is Point => point !== undefined);

  const minX = Math.min(...placed.map((p) => p.x));
  const maxX = Math.max(...placed.map((p) => p.x));
  const minY = Math.min(...placed.map((p) => p.y));
  const maxY = Math.max(...placed.map((p) => p.y));
  const availableWidth = VIEW_WIDTH - PADDING * 2;
  const availableHeight = VIEW_HEIGHT - PADDING * 2;
  const scale = Math.min(
    MAX_SCALE,
    availableWidth / Math.max(maxX - minX, 1),
    availableHeight / Math.max(maxY - minY, 1),
  );
  const offsetX = (VIEW_WIDTH - (maxX - minX) * scale) / 2 - minX * scale;
  const offsetY = (VIEW_HEIGHT - (maxY - minY) * scale) / 2 - minY * scale;
  const toView = (point: Point): Point => ({ x: point.x * scale + offsetX, y: point.y * scale + offsetY });

  const atoms = structure.atoms.flatMap((symbol, index) => {
    const point = points[index];
    return point ? [{ symbol, ...toView(point) }] : [];
  });

  const bonds = structure.bonds.flatMap(({ from, to, order }) => {
    const start = points[from];
    const end = points[to];
    if (!start || !end) {
      return [];
    }
    const a = toView(start);
    const b = toView(end);
    return [{ x1: a.x, y1: a.y, x2: b.x, y2: b.y, order }];
  });

  return { width: VIEW_WIDTH, height: VIEW_HEIGHT, atoms, bonds };
}
