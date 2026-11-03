import { create } from 'zustand';
import type { Exercise } from '../../types';
export interface SessionState { queue: Exercise[]; currentIndex: number; isRunning: boolean; elapsed: number; startSession: (exercises: Exercise[], startIndex: number) => void; toggleRun: () => void; next: () => void; prev: () => void; addToSession: (exercise: Exercise) => void; tick: () => void; }
export const useSessionStore = create<SessionState>()((set, get) => ({
  queue: [], currentIndex: -1, isRunning: false, elapsed: 0,
  startSession: (exercises, startIndex) => set({ queue: exercises, currentIndex: exercises.length ? Math.max(0, Math.min(startIndex, exercises.length - 1)) : -1, isRunning: exercises.length > 0, elapsed: 0 }),
  toggleRun: () => set((s) => s.currentIndex < 0 ? s : { isRunning: !s.isRunning }),
  next: () => set((s) => { if (s.currentIndex < 0) return s; if (s.currentIndex >= s.queue.length - 1) return { ...s, isRunning: false, elapsed: 0 }; return { currentIndex: s.currentIndex + 1, elapsed: 0 }; }),
  prev: () => set((s) => { if (s.currentIndex < 0) return s; if (s.elapsed > 3 || s.currentIndex === 0) return { elapsed: 0 }; return { currentIndex: s.currentIndex - 1, elapsed: 0 }; }),
  addToSession: (exercise) => set((s) => s.queue.some((item) => item.id === exercise.id) ? s : { queue: [...s.queue, exercise] }),
  tick: () => { const s = get(); const current = s.queue[s.currentIndex]; if (!s.isRunning || !current) return; if (s.elapsed + 1 >= current.duration) get().next(); else set({ elapsed: s.elapsed + 1 }); }
}));
