import { CircleCheck, CircleAlert } from 'lucide-react';
import type { BalanceStatus } from '@/app/hooks/useBalanceGame';

interface BalanceFeedbackProps {
  status: BalanceStatus;
  invalid: boolean;
  lastPoints: number;
  hint: string;
}

export default function BalanceFeedback({ status, invalid, lastPoints, hint }: BalanceFeedbackProps) {
  if (invalid) {
    return (
      <div role="status" aria-live="polite" className="flex items-start gap-4 rounded-card bg-warning-soft p-5 text-ink">
        <CircleAlert size={28} aria-hidden="true" className="mt-1 shrink-0 text-warning-text" />
        <p className="text-lg">Escribe un número entero mayor que cero en cada casilla.</p>
      </div>
    );
  }

  if (status === 'wrong') {
    return (
      <div role="status" aria-live="polite" className="flex items-start gap-4 rounded-card bg-error-soft p-5 text-ink">
        <CircleAlert size={28} aria-hidden="true" className="mt-1 shrink-0" />
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">Todavía no están balanceadas</p>
          <p className="text-lg">Pista: {hint}</p>
        </div>
      </div>
    );
  }

  if (status === 'solved') {
    return (
      <div role="status" aria-live="polite" className="flex items-start gap-4 rounded-card bg-success-soft p-5 text-success-text">
        <CircleCheck size={28} aria-hidden="true" className="mt-1 shrink-0" />
        <p className="text-xl font-bold">
          {lastPoints > 0
            ? `¡Balanceada! +${lastPoints} puntos`
            : '¡Balanceada! Esta vez no suma puntos, pero queda resuelta.'}
        </p>
      </div>
    );
  }

  return null;
}
