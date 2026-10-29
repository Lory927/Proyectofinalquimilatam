import { useSyncExternalStore } from 'react';
import { getProgress, subscribeProgress } from '@/app/services/progress.service';

export function useProgress() {
  return useSyncExternalStore(subscribeProgress, getProgress);
}
