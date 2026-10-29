import { FlaskConical, Grid3x3, BookOpen, Hexagon, ListChecks, Pencil, Scale, Table } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { GameId } from '@/app/models/game';

export const GAME_ICONS: Record<GameId, LucideIcon> = {
  'cuestionario-periodico': ListChecks,
  'memorama-formulas': Grid3x3,
  'memorama-moleculas': Hexagon,
  'balanceo-ecuaciones': Scale,
};

export interface ModuleInfo {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export type ExplorerId = 'tabla-periodica' | 'moleculas' | 'laboratorio' | 'editor' | 'teoria';

export const EXPLORER_MODULES: (ModuleInfo & { id: ExplorerId })[] = [
  {
    id: 'tabla-periodica',
    name: 'Tabla periódica',
    description: 'Explora los elementos, sus propiedades y sus usos cotidianos.',
    icon: Table,
  },
  {
    id: 'moleculas',
    name: 'Moléculas y compuestos',
    description: 'Descubre la forma y la composición de sustancias como el agua o la glucosa.',
    icon: Hexagon,
  },
  {
    id: 'laboratorio',
    name: 'Laboratorio virtual',
    description: 'Cambia variables en experimentos simulados y observa los resultados.',
    icon: FlaskConical,
  },
  {
    id: 'editor',
    name: 'Editor de moléculas',
    description: 'Construye estructuras sencillas uniendo átomos con enlaces.',
    icon: Pencil,
  },
  {
    id: 'teoria',
    name: 'Biblioteca de teoría',
    description: 'Lee explicaciones breves con ejemplos y preguntas de repaso.',
    icon: BookOpen,
  },
];
