import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';
import { routineReducer, type Routine, type RoutineAction } from './routineReducer';
import { withLogger } from './withLogger';
const StateContext = createContext<Routine[] | undefined>(undefined);
const DispatchContext = createContext<Dispatch<RoutineAction> | undefined>(undefined);
const initial: Routine[] = (() => { try { const raw = localStorage.getItem('workout-routines'); return raw ? JSON.parse(raw) as Routine[] : []; } catch { return []; } })();
export function RoutineProvider({ children }: { children: ReactNode }) {
  const [routines, dispatch] = useReducer(withLogger(routineReducer), initial);
  useEffect(() => { localStorage.setItem('workout-routines', JSON.stringify(routines)); }, [routines]);
  const stateValue = useMemo(() => routines, [routines]);
  return <StateContext.Provider value={stateValue}><DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider></StateContext.Provider>;
}
export function useRoutines(): Routine[] { const value = useContext(StateContext); if (!value) throw new Error('useRoutines phải được dùng bên trong RoutineProvider'); return value; }
export function useRoutineDispatch(): Dispatch<RoutineAction> { const value = useContext(DispatchContext); if (!value) throw new Error('useRoutineDispatch phải được dùng bên trong RoutineProvider'); return value; }
