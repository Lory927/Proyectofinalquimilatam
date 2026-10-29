import type { Achievement } from '@/app/models/progress';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'primer-acierto',
    name: 'Primer acierto',
    description: 'Responde correctamente tu primera pregunta.',
    condition: { type: 'correct-answers', min: 1 },
    reward: { xp: 20, badge: 'Chispa inicial' },
  },
  {
    id: 'racha-3',
    name: 'En racha',
    description: 'Consigue 3 aciertos seguidos.',
    condition: { type: 'best-streak', min: 3 },
    reward: { xp: 30, badge: 'Imparable' },
  },
  {
    id: 'racha-5',
    name: 'Racha de fuego',
    description: 'Consigue 5 aciertos seguidos.',
    condition: { type: 'best-streak', min: 5 },
    reward: { xp: 50, badge: 'Fuego químico' },
  },
  {
    id: 'sin-errores',
    name: 'Precisión total',
    description: 'Termina una actividad sin ningún error.',
    condition: { type: 'perfect-game' },
    reward: { xp: 40, badge: 'Precisión total' },
  },
  {
    id: 'equilibrio-perfecto',
    name: 'Equilibrio perfecto',
    description: 'Balancea 5 ecuaciones correctamente.',
    condition: { type: 'equations-balanced', min: 5 },
    reward: { xp: 50, badge: 'Conservación de la masa' },
  },
  {
    id: 'explorador-periodico',
    name: 'Explorador periódico',
    description: 'Consulta 10 elementos en la tabla periódica.',
    condition: { type: 'elements-viewed', min: 10 },
    reward: { xp: 30, badge: 'Mapa periódico' },
  },
  {
    id: 'dedicacion',
    name: 'Dedicación',
    description: 'Termina 5 juegos.',
    condition: { type: 'games-completed', min: 5 },
    reward: { xp: 40, badge: 'Científico constante' },
  },
  {
    id: 'nivel-3',
    name: 'Científico en formación',
    description: 'Alcanza el nivel 3.',
    condition: { type: 'level', min: 3 },
    reward: { xp: 60, badge: 'Científico' },
  },
];
