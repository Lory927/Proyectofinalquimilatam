import { useState } from 'react';
import type { GameId } from '@/app/models/game';
import type { Question } from '@/app/models/quiz';
import { createQuizSession, evaluateAnswer, type QuizSession } from '@/app/services/quiz-session.service';
import { finishGame, recordAnswer } from '@/app/services/progress.service';

export interface AnswerFeedback {
  selectedIndex: number;
  correctIndex: number;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
  explanation: string;
}

export interface QuizState {
  session: QuizSession;
  index: number;
  correct: number;
  incorrect: number;
  points: number;
  feedback: AnswerFeedback | null;
  finished: boolean;
}

function startState(gameId: GameId, questions: Question[]): QuizState {
  return {
    session: createQuizSession(gameId, questions),
    index: 0,
    correct: 0,
    incorrect: 0,
    points: 0,
    feedback: null,
    finished: false,
  };
}

export function useQuizSession(gameId: GameId, questions: Question[]) {
  const [state, setState] = useState(() => startState(gameId, questions));
  const question = state.session.questions[state.index];

  function answer(selectedIndex: number) {
    if (state.feedback || state.finished) {
      return;
    }
    const isCorrect = evaluateAnswer(question, selectedIndex);
    const points = recordAnswer(isCorrect);
    setState({
      ...state,
      correct: state.correct + (isCorrect ? 1 : 0),
      incorrect: state.incorrect + (isCorrect ? 0 : 1),
      points: state.points + points,
      feedback: {
        selectedIndex,
        correctIndex: question.correctIndex,
        correctAnswer: question.options[question.correctIndex],
        isCorrect,
        points,
        explanation: question.explanation,
      },
    });
  }

  function next() {
    if (!state.feedback) {
      return;
    }
    const isLast = state.index + 1 >= state.session.questions.length;
    if (isLast) {
      finishGame(state.session.id, {
        gameId: state.session.gameId,
        correct: state.correct,
        incorrect: state.incorrect,
        points: state.points,
      });
      setState({ ...state, feedback: null, finished: true });
      return;
    }
    setState({ ...state, index: state.index + 1, feedback: null });
  }

  function restart() {
    setState(startState(gameId, questions));
  }

  return {
    state,
    question,
    total: state.session.questions.length,
    answer,
    next,
    restart,
  };
}
