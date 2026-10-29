import { Atom } from 'lucide-react';
import MoleculeDrawing from '@/app/components/memory/MoleculeDrawing';
import type { MemoryCard } from '@/app/services/memory.service';

interface MemoryBoardProps {
  cards: MemoryCard[];
  flipped: number[];
  matched: string[];
  disabled: boolean;
  onFlip: (index: number) => void;
}

export default function MemoryBoard({ cards, flipped, matched, disabled, onFlip }: MemoryBoardProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4" aria-label="Tablero de cartas">
      {cards.map((card, index) => {
        const isMatched = matched.includes(card.pairId);
        const isRevealed = isMatched || flipped.includes(index);
        const faceLabel = card.content.kind === 'text' ? card.content.text : 'Representación de una molécula';

        const stateClasses = isMatched
          ? 'border-success bg-success-soft text-success-text'
          : isRevealed
            ? 'border-primary bg-surface text-ink'
            : 'border-primary bg-primary text-white hover:-translate-y-0.5 hover:bg-primary-hover';

        return (
          <li key={card.id}>
            <button
              type="button"
              disabled={disabled || isRevealed}
              onClick={() => onFlip(index)}
              aria-label={isRevealed ? faceLabel : `Carta ${index + 1}, oculta`}
              className={`flex min-h-[120px] w-full items-center justify-center rounded-card border-2 p-3 shadow-card transition duration-200 ease-out md:min-h-[150px] md:p-4 ${stateClasses}`}
            >
              {!isRevealed && <Atom size={32} aria-hidden="true" />}
              {isRevealed && card.content.kind === 'text' && (
                <span className="text-center text-base font-semibold leading-snug">{card.content.text}</span>
              )}
              {isRevealed && card.content.kind === 'structure' && (
                <span className="flex h-full w-full items-center justify-center">
                  <MoleculeDrawing layout={card.content.layout} />
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
