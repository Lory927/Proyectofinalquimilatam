import { useState } from 'react';
import GameHeader from '@/app/components/game/GameHeader';
import TheoryArticleView from '@/app/components/theory/TheoryArticleView';
import type { TheoryArticle } from '@/app/models/theory';
import { getTheoryArticles } from '@/app/services/chemistry-data.service';
import {
  filterTheoryArticles,
  getTheoryCategories,
  type TheoryCategoryFilter,
} from '@/app/services/theory-library.service';

interface TheoryLibraryProps {
  onExit: () => void;
}

export default function TheoryLibrary({ onExit }: TheoryLibraryProps) {
  const articles = getTheoryArticles();
  const categories = getTheoryCategories(articles);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<TheoryCategoryFilter>('todas');
  const [selected, setSelected] = useState<TheoryArticle | null>(null);

  if (selected) {
    return <TheoryArticleView article={selected} onBack={() => setSelected(null)} />;
  }

  const visible = filterTheoryArticles(articles, query, category);
  const filters: TheoryCategoryFilter[] = ['todas', ...categories];

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <GameHeader
        title="Biblioteca de teoría"
        label={`${visible.length} de ${articles.length} lecturas`}
        onExit={onExit}
      />

      <p className="max-w-prose text-lg text-ink-muted">
        Lecturas breves con ejemplos y preguntas para repasar. Elige un tema o busca una palabra clave.
      </p>

      <div className="flex flex-col gap-4">
        <label className="relative w-full md:max-w-sm">
          <span className="sr-only">Buscar en la teoría</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por título o palabra clave"
            className="w-full rounded-btn border border-ink/15 bg-surface py-3 pl-4 pr-4 text-base text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
          />
        </label>

        <div role="group" aria-label="Filtrar por tema" className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = category === filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setCategory(filter)}
                className={`btn px-4 py-2 text-base ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              >
                {filter === 'todas' ? 'Todas' : filter}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="card p-8 text-center text-lg text-ink-muted">
          No encontramos lecturas con esa búsqueda. Prueba con otra palabra o cambia el tema.
        </p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {visible.map((article) => (
            <li key={article.id}>
              <article className="card flex h-full flex-col gap-4 p-6 md:p-8">
                <div className="flex flex-col gap-2">
                  <p className="text-base font-semibold text-primary">{article.category}</p>
                  <h2 className="text-xl">{article.title}</h2>
                  <p className="text-ink-muted">{article.body[0]}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(article)}
                  className="btn btn-primary mt-auto w-fit"
                >
                  Leer lectura
                </button>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
