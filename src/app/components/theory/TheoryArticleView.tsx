import GameHeader from '@/app/components/game/GameHeader';
import type { TheoryArticle } from '@/app/models/theory';
import { resolveLink } from '@/app/services/theory-library.service';

interface TheoryArticleViewProps {
  article: TheoryArticle;
  onBack: () => void;
}

export default function TheoryArticleView({ article, onBack }: TheoryArticleViewProps) {
  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <GameHeader title={article.category} label={article.title} onExit={onBack} />

      <article className="flex flex-col gap-5">
        {article.body.map((paragraph) => (
          <p key={paragraph} className="max-w-prose text-lg text-ink">
            {paragraph}
          </p>
        ))}
      </article>

      <section aria-labelledby="examples-title" className="card flex flex-col gap-4 p-6 md:p-8">
        <h2 id="examples-title" className="text-lg">
          Ejemplos
        </h2>
        <ul className="flex list-disc flex-col gap-3 pl-5 text-base text-ink">
          {article.examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="review-title" className="rounded-card bg-primary-soft p-6 md:p-8">
        <h2 id="review-title" className="mb-4 text-lg text-primary">
          Para repasar
        </h2>
        <ol className="flex list-decimal flex-col gap-3 pl-5 text-base text-ink">
          {article.reviewQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </section>

      {article.relatedLinks.length > 0 && (
        <section aria-labelledby="related-title" className="flex flex-col gap-4">
          <h2 id="related-title" className="text-lg">
            Relacionado en QuimiLATAM
          </h2>
          <ul className="flex flex-wrap gap-2">
            {article.relatedLinks.map((link) => {
              const resolved = resolveLink(link);
              return (
                <li
                  key={`${link.kind}-${link.id}`}
                  className="rounded-btn bg-canvas px-4 py-2 text-base text-ink ring-1 ring-inset ring-ink/10"
                >
                  <span className="font-semibold text-ink-muted">{resolved.kind}: </span>
                  {resolved.name}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section aria-labelledby="references-title" className="flex flex-col gap-2">
        <h2 id="references-title" className="text-base font-bold text-ink-muted">
          Fuentes
        </h2>
        <ul className="flex flex-col gap-1 text-base text-ink-muted">
          {article.references.map((reference) => (
            <li key={reference}>{reference}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
