import { useEffect, useRef, type ReactNode } from 'react';

interface DialogProps {
  titleId: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Dialog({ titleId, onClose, children }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 md:items-center md:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="card flex max-h-[90vh] w-full max-w-2xl flex-col gap-6 overflow-y-auto rounded-b-none p-6 focus:outline-none md:rounded-card md:p-8"
      >
        {children}
      </div>
    </div>
  );
}
