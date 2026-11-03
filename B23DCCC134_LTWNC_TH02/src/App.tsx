const BUILD_TAG = "wk-5182";
import { lazy, Suspense } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import LibraryPage from './features/library/LibraryPage';
import SessionBar from './features/session/SessionBar';
import { RoutineProvider } from './features/routines/RoutineContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
const SavedPage = lazy(() => import('./features/saved/SavedPage'));
const RoutinesPage = lazy(() => import('./features/routines/RoutinesPage'));
const RoutineDetailPage = lazy(() => import('./features/routines/RoutineDetailPage'));
function Layout() { const { theme, toggleTheme } = useTheme(); return <div className={`app theme-${theme}`}><header className="topbar"><div className="brand"><span className="brand-mark">W</span><span>workout<span className="brand-dot">.</span></span></div><nav><NavLink to="/" end>KHO BÀI TẬP</NavLink><NavLink to="/saved">ĐÃ LƯU</NavLink><NavLink to="/routines">GIÁO ÁN</NavLink></nav><button className="theme-toggle" onClick={toggleTheme}>{theme === 'light' ? '☾ Giao diện tối' : '☀ Giao diện sáng'}</button></header><main className="content"><Suspense fallback={<p>Đang tải trang...</p>}><Routes><Route path="/" element={<LibraryPage />} /><Route path="/saved" element={<SavedPage />} /><Route path="/routines" element={<RoutinesPage />} /><Route path="/routines/:id" element={<RoutineDetailPage />} /></Routes></Suspense></main><SessionBar /><div className="build-tag" aria-hidden="true">{BUILD_TAG}</div></div>; }
export default function App() { return <ThemeProvider><RoutineProvider><BrowserRouter><Layout /></BrowserRouter></RoutineProvider></ThemeProvider>; }
