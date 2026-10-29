import type { ModuleInfo } from '@/app/config/modules';

interface ModuleLinkCardProps {
  module: ModuleInfo;
  actionLabel: string;
  onOpen: () => void;
}

export default function ModuleLinkCard({ module, actionLabel, onOpen }: ModuleLinkCardProps) {
  const Icon = module.icon;

  return (
    <article className="card flex h-full flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-btn bg-primary-soft text-primary">
          <Icon size={24} aria-hidden="true" />
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="text-xl">{module.name}</h3>
          <p className="text-ink-muted">{module.description}</p>
        </div>
      </div>
      <button type="button" onClick={onOpen} className="btn btn-primary w-fit shrink-0">
        {actionLabel}
      </button>
    </article>
  );
}
