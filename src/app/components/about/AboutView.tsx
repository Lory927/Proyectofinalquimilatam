import { IMAGE_CREDITS } from '@/app/data/image-credits';
import { getTheoryArticles } from '@/app/services/chemistry-data.service';

export default function AboutView() {
  const contentSources = [...new Set(getTheoryArticles().flatMap((article) => article.references))];

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl md:text-3xl">Acerca de</h1>
        <p className="max-w-prose text-lg text-ink-muted">
          QuimiLATAM es una herramienta educativa para aprender química con retos, simulaciones y lecturas.
        </p>
      </header>

      <section aria-labelledby="credits-title" className="flex flex-col gap-6">
        <h2 id="credits-title" className="text-xl md:text-2xl">
          Créditos de imágenes
        </h2>
        {IMAGE_CREDITS.length === 0 ? (
          <p className="card p-6 text-lg text-ink-muted">Esta versión no incluye imágenes de terceros.</p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {IMAGE_CREDITS.map((credit) => (
              <li key={credit.id} className="card flex flex-col gap-3 p-6">
                <h3 className="text-lg">{credit.title}</h3>
                <p className="text-base text-ink-muted">
                  {credit.author} · {credit.sourceSite}
                </p>
                <p className="text-base text-ink-muted">Licencia: {credit.license}</p>
                <p className="text-base text-ink-muted">Consultado el {credit.consultedOn}</p>
                <a
                  href={credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit break-all text-base font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Ver fuente original
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="sources-title" className="flex flex-col gap-6">
        <h2 id="sources-title" className="text-xl md:text-2xl">
          Fuentes del contenido
        </h2>
        <ul className="card flex flex-col gap-3 p-6 text-base text-ink">
          {contentSources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
