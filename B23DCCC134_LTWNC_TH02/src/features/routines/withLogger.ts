import type { Routine, RoutineAction } from './routineReducer';
export const withLogger = (reducer: (state: Routine[], action: RoutineAction) => Routine[]) => (state: Routine[], action: RoutineAction): Routine[] => {
  const next = reducer(state, action);
  if (import.meta.env.DEV) console.log(`[Routine] ${action.type}`, { before: state, after: next });
  return next;
};
