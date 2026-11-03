import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
type Theme = 'light' | 'dark';
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | undefined>(undefined);
export function ThemeProvider({ children }: { children: ReactNode }) { const [theme, setTheme] = useState<Theme>('light'); const value = useMemo(() => ({ theme, toggleTheme: () => setTheme((t) => t === 'light' ? 'dark' : 'light') }), [theme]); return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>; }
export function useTheme() { const value = useContext(ThemeContext); if (!value) throw new Error('useTheme phải được dùng bên trong ThemeProvider'); return value; }
