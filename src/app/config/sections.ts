import { Home, Info, LayoutGrid, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type SectionId = 'inicio' | 'modulos' | 'progreso' | 'acerca';

export interface SectionDefinition {
  id: SectionId;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const PLACEHOLDER_DESCRIPTION = 'Contenido en preparación. Esta sección estará disponible muy pronto.';

export const SECTIONS: Record<SectionId, SectionDefinition> = {
  inicio: {
    id: 'inicio',
    label: 'Inicio',
    title: 'Inicio',
    description: PLACEHOLDER_DESCRIPTION,
    icon: Home,
  },
  modulos: {
    id: 'modulos',
    label: 'Módulos',
    title: 'Módulos',
    description: PLACEHOLDER_DESCRIPTION,
    icon: LayoutGrid,
  },
  progreso: {
    id: 'progreso',
    label: 'Progreso',
    title: 'Progreso',
    description: PLACEHOLDER_DESCRIPTION,
    icon: Trophy,
  },
  acerca: {
    id: 'acerca',
    label: 'Acerca de',
    title: 'Acerca de',
    description: PLACEHOLDER_DESCRIPTION,
    icon: Info,
  },
};
