import { Atom, Search } from 'lucide-react';
import { useCallback, useState, type ReactNode } from 'react';
import GlobalSearchDialog from '@/app/components/search/GlobalSearchDialog';
import { SECTIONS, type SectionId } from '@/app/config/sections';

interface AppShellProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  children: ReactNode;
}

const SECTION_LIST = Object.values(SECTIONS);

export default function AppShell({ activeSection, onNavigate, children }: AppShellProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
          <a href="#inicio" className="flex items-center gap-3 rounded-btn">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-btn bg-primary text-white"
            >
              <Atom size={22} />
            </span>
            <span className="font-heading text-xl font-bold text-ink">QuimiLATAM</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Buscar"
              className="flex h-11 w-11 items-center justify-center rounded-btn text-ink-muted transition duration-200 ease-out hover:bg-primary-soft hover:text-primary"
            >
              <Search size={22} aria-hidden="true" />
            </button>

            <nav aria-label="Secciones principales" className="hidden md:block">
              <ul className="flex items-center gap-2">
                {SECTION_LIST.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.id === activeSection;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onNavigate(item.id)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex min-h-[44px] items-center gap-2 rounded-btn px-4 py-2 font-semibold transition duration-200 ease-out ${
                          isActive
                            ? 'bg-primary text-white'
                            : 'text-ink-muted hover:bg-primary-soft hover:text-primary'
                        }`}
                      >
                        <Icon size={20} aria-hidden="true" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-6 md:px-6 md:pb-12 md:pt-10">
        {children}
      </main>

      {isSearchOpen && <GlobalSearchDialog onClose={closeSearch} onNavigate={onNavigate} />}

      <nav
        aria-label="Secciones principales"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <ul className="mx-auto grid max-w-md grid-cols-4">
          {SECTION_LIST.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeSection;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[56px] w-full flex-col items-center justify-center gap-1 px-1 py-2 text-base font-semibold transition duration-200 ease-out ${
                    isActive ? 'text-primary' : 'text-ink-muted'
                  }`}
                >
                  <span
                    className={`flex h-8 w-12 items-center justify-center rounded-btn transition duration-200 ease-out ${
                      isActive ? 'bg-primary-soft' : ''
                    }`}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
