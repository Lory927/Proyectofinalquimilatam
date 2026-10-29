import { useCallback, useEffect, useState } from 'react';
import { SECTIONS, type SectionId } from '@/app/config/sections';

const DEFAULT_SECTION: SectionId = 'inicio';

function isSectionId(value: string): value is SectionId {
  return Object.prototype.hasOwnProperty.call(SECTIONS, value);
}

function readSectionFromHash(): SectionId {
  const hash = window.location.hash.replace('#', '');
  return isSectionId(hash) ? hash : DEFAULT_SECTION;
}

export function useHashRoute() {
  const [section, setSection] = useState<SectionId>(readSectionFromHash);

  useEffect(() => {
    const handleHashChange = () => setSection(readSectionFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((next: SectionId) => {
    window.location.hash = next;
    window.scrollTo({ top: 0 });
  }, []);

  return { section, navigate };
}
