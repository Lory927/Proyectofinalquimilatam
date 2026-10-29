import type { SectionDefinition } from '@/app/config/sections';

interface SectionPlaceholderProps {
  section: SectionDefinition;
}

export default function SectionPlaceholder({ section }: SectionPlaceholderProps) {
  const Icon = section.icon;
  return (
    <section
      aria-labelledby="section-title"
      className="card mx-auto flex max-w-xl flex-col items-center gap-4 p-8 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-card bg-primary-soft text-primary">
        <Icon size={32} aria-hidden="true" />
      </span>
      <h1 id="section-title" className="text-2xl md:text-3xl">
        {section.title}
      </h1>
      <p className="text-ink-muted">{section.description}</p>
    </section>
  );
}
