import { useEffect, useRef, useState } from 'react';
import type { GameId } from '@/app/models/game';
import { finishGame, recordAnswer } from '@/app/services/progress.service';
import { buildDeck, isMemoryMatch, type MemoryCard, type MemoryPair } from '@/app/services/memory.service';
import { createSessionId } from '@/app/services/quiz-session.service';

const MISMATCH_DELAY_MS = 900;

export interface MemoryState {
  sessionId: string;
  gameId: GameId;
  cards: MemoryCard[];
  pairCount: number;
  flipped: number[];
  matched: string[];
  correct: number;
  incorrect: number;
  points: number;
  busy: boolean;
  finished: boolean;
}

function startState(gameId: GameId, createPairs: () => MemoryPair[]): MemoryState {
  const pairs = createPairs();
  return {
    sessionId: createSessionId(gameId),
    gameId,
    cards: buildDeck(pairs),
    pairCount: pairs.length,
    flipped: [],
    matched: [],
    correct: 0,
    incorrect: 0,
    points: 0,
    busy: false,
    finished: false,
  };
}

export function useMemoryGame(gameId: GameId, createPairs: () => MemoryPair[]) {
  const [state, setState] = useState(() => startState(gameId, createPairs));
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function flip(index: number) {
    const card = state.cards[index];
    if (state.busy || state.finished || state.flipped.includes(index) || state.matched.includes(card.pairId)) {
      return;
    }

    if (state.flipped.length === 0) {
      setState({ ...state, flipped: [index] });
      return;
    }

    const [firstIndex] = state.flipped;
    const isMatch = isMemoryMatch(state.cards[firstIndex], card);
    const points = recordAnswer(isMatch);
    const correct = state.correct + (isMatch ? 1 : 0);
    const incorrect = state.incorrect + (isMatch ? 0 : 1);
    const totalPoints = state.points + points;

    if (isMatch) {
      const matched = [...state.matched, card.pairId];
      const finished = matched.length === state.pairCount;
      if (finished) {
        finishGame(state.sessionId, { gameId: state.gameId, correct, incorrect, points: totalPoints });
      }
      setState({
        ...state,
        flipped: [],
        matched,
        correct,
        incorrect,
        points: totalPoints,
        finished,
      });
      return;
    }

    setState({ ...state, flipped: [firstIndex, index], correct, incorrect, points: totalPoints, busy: true });
    timer.current = window.setTimeout(() => {
      setState((current) => ({ ...current, flipped: [], busy: false }));
    }, MISMATCH_DELAY_MS);
  }

  function restart() {
    window.clearTimeout(timer.current);
    setState(startState(gameId, createPairs));
  }

  return { state, flip, restart };
}
