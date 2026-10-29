import { useState } from 'react';
import type { GameId } from '@/app/models/game';
import type { Equation } from '@/app/models/quiz';
import { createEquationDeck, isBalanced, parseCoefficients, speciesCount } from '@/app/services/balance.service';
import { finishGame, recordAnswer, recordEquationBalanced } from '@/app/services/progress.service';
import { createSessionId } from '@/app/services/quiz-session.service';

export type BalanceStatus = 'editing' | 'wrong' | 'solved';

export interface BalanceState {
  sessionId: string;
  gameId: GameId;
  equations: Equation[];
  index: number;
  inputs: string[];
  attempts: number;
  status: BalanceStatus;
  invalid: boolean;
  lastPoints: number;
  correct: number;
  incorrect: number;
  points: number;
  finished: boolean;
}

function startState(gameId: GameId): BalanceState {
  const equations = createEquationDeck();
  return {
    sessionId: createSessionId(gameId),
    gameId,
    equations,
    index: 0,
    inputs: Array(speciesCount(equations[0])).fill(''),
    attempts: 0,
    status: 'editing',
    invalid: false,
    lastPoints: 0,
    correct: 0,
    incorrect: 0,
    points: 0,
    finished: false,
  };
}

export function useBalanceGame(gameId: GameId) {
  const [state, setState] = useState(() => startState(gameId));
  const equation = state.equations[state.index];

  function changeInput(position: number, value: string) {
    const inputs = state.inputs.map((current, i) => (i === position ? value : current));
    setState({ ...state, inputs, invalid: false });
  }

  function check() {
    if (state.status === 'solved' || state.finished) {
      return;
    }
    const coefficients = parseCoefficients(state.inputs);
    if (!coefficients || coefficients.length !== speciesCount(equation)) {
      setState({ ...state, invalid: true });
      return;
    }

    const solved = isBalanced(equation, coefficients);
    const isFirstAttempt = state.attempts === 0;
    const points = isFirstAttempt ? recordAnswer(solved) : 0;
    if (solved) {
      recordEquationBalanced();
    }

    setState({
      ...state,
      attempts: state.attempts + 1,
      status: solved ? 'solved' : 'wrong',
      lastPoints: points,
      correct: state.correct + (isFirstAttempt && solved ? 1 : 0),
      incorrect: state.incorrect + (isFirstAttempt && !solved ? 1 : 0),
      points: state.points + points,
    });
  }

  function next() {
    if (state.status !== 'solved') {
      return;
    }
    if (state.index + 1 >= state.equations.length) {
      finishGame(state.sessionId, {
        gameId: state.gameId,
        correct: state.correct,
        incorrect: state.incorrect,
        points: state.points,
      });
      setState({ ...state, finished: true });
      return;
    }
    const nextEquation = state.equations[state.index + 1];
    setState({
      ...state,
      index: state.index + 1,
      inputs: Array(speciesCount(nextEquation)).fill(''),
      attempts: 0,
      status: 'editing',
      invalid: false,
      lastPoints: 0,
    });
  }

  function restart() {
    setState(startState(gameId));
  }

  return { state, equation, total: state.equations.length, changeInput, check, next, restart };
}
