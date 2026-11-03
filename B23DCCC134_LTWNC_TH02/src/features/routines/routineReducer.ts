export interface Routine { id: string; name: string; exerciseIds: string[]; }
export type RoutineAction = { type: 'create'; routine: Routine } | { type: 'rename'; id: string; name: string } | { type: 'remove'; id: string } | { type: 'addExercise'; id: string; exerciseId: string } | { type: 'removeExercise'; id: string; exerciseId: string };
export function routineReducer(state: Routine[], action: RoutineAction): Routine[] {
  switch (action.type) {
    case 'create': return [...state, action.routine];
    case 'rename': return state.map((r) => r.id === action.id ? { ...r, name: action.name } : r);
    case 'remove': return state.filter((r) => r.id !== action.id);
    case 'addExercise': return state.map((r) => r.id === action.id && !r.exerciseIds.includes(action.exerciseId) ? { ...r, exerciseIds: [...r.exerciseIds, action.exerciseId] } : r);
    case 'removeExercise': return state.map((r) => r.id === action.id ? { ...r, exerciseIds: r.exerciseIds.filter((id) => id !== action.exerciseId) } : r);
    default: return state;
  }
}
