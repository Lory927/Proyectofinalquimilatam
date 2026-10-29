import { Gamepad2, Save, Zap } from 'lucide-react';
import LevelSummary from '@/app/components/score/LevelSummary';
import MoleculeIllustration from '@/app/components/home/MoleculeIllustration';
import type { SectionId } from '@/app/config/sections';
import { useProgress } from '@/app/hooks/useProgress';
import { getLevelProgress } from '@/app/services/score.service';

interface HomeViewProps {
  onNavigate: (section: SectionId) => void;
}

const VALUE_POINTS = [
  {
    icon: Gamepad2,
    title: 'Aprende jugando',
    text: 'Retos cortos sobre la tabla periódica, las fórmulas y las ecuaciones.',
  },
  {
    icon: Zap,
    title: 'Respuesta inmediata',
    text: 'Sabes al instante si acertaste y por qué, con una explicación breve.',
  },
  {
    icon: Save,
    title: 'Progreso guardado',
    text: 'Tus puntos, tu nivel y tus logros se conservan en este dispositivo.',
  },
];

export default function HomeView({ onNavigate }: HomeViewProps) {
  const progress = useProgress();
  const levelProgress = getLevelProgress(progress.xp);

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <section
        aria-labelledby="hero-title"
        className="grid items-center gap-8 rounded-card bg-ink p-6 text-white shadow-card md:grid-cols-2 md:gap-10 md:p-12"
      >
        <div className="flex flex-col gap-6">
          <p className="inline-flex w-fit items-center rounded-btn bg-highlight px-4 py-2 font-semibold text-ink">
            Química para secundaria y preparatoria
          </p>
          <h1 id="hero-title" className="text-2xl text-white md:text-3xl">
            Domina la química jugando
          </h1>
          <p className="max-w-prose text-lg text-white/90">
            QuimiLATAM convierte la tabla periódica, las fórmulas y las ecuaciones en retos cortos que puedes
            resolver desde tu celular.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('modulos')}
            className="btn w-fit bg-surface text-primary hover:bg-primary-soft"
          >
            Empezar a jugar
          </button>
        </div>
        <div className="flex justify-center">
          <MoleculeIllustration />
        </div>
      </section>

      <ul className="grid gap-4 md:grid-cols-3">
        {VALUE_POINTS.map((point) => {
          const Icon = point.icon;
          return (
            <li key={point.title} className="card flex flex-col gap-3 p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-btn bg-primary-soft text-primary">
                <Icon size={24} aria-hidden="true" />
              </span>
              <h2 className="text-lg">{point.title}</h2>
              <p className="text-ink-muted">{point.text}</p>
            </li>
          );
        })}
      </ul>

      <div className="mx-auto w-full max-w-xl">
        <LevelSummary
          level={levelProgress.level}
          currentXp={levelProgress.currentXp}
          levelSpan={levelProgress.levelSpan}
          percent={levelProgress.percent}
          streak={progress.streak}
        />
      </div>
    </div>
  );
}
