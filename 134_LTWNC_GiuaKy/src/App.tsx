import { lazy, Suspense } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useTheme } from './theme/ThemeContext';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { clearBorrowNotice } from './features/borrowed/borrowedSlice';
import { useEffect } from 'react';
import { fetchBooks } from './features/books/booksSlice';
import { BookListPage } from './pages/BookListPage';
import { BorrowedPage } from './pages/BorrowedPage';
const StatsPage = lazy(() => import('./pages/StatsPage').then(m => ({ default: m.StatsPage })));

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const notice = useAppSelector(s => s.borrowed.notice);
  const borrowedCount = useAppSelector(s => s.borrowed.items.length);
  useEffect(() => { dispatch(fetchBooks()); }, [dispatch]);
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => dispatch(clearBorrowNotice()), 3500); return () => window.clearTimeout(timer); }, [notice, dispatch]);
  return <div className={`app theme-${theme}`}><header className="topbar"><Link to="/" className="brand"><span className="brand-icon">▤</span><span>Mini Library<small></small></span></Link><nav><Link to="/">Danh sách sách</Link><Link to="/borrowed">Sách đang mượn <b>{borrowedCount}</b></Link><Link to="/stats">Thống kê</Link></nav><button className="theme-button" onClick={toggleTheme} aria-label="Đổi giao diện">{theme === 'light' ? '🌙' : '☀️'}<span>{theme === 'light' ? 'Tối' : 'Sáng'}</span></button></header>{notice && <div role="status" className={`notice ${notice.type}`}>{notice.message}</div>}<main className="main"><Suspense fallback={<div className="loading-panel">Đang tải trang thống kê...</div>}><Routes><Route path="/" element={<BookListPage/>}/><Route path="/borrowed" element={<BorrowedPage/>}/><Route path="/stats" element={<StatsPage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></Suspense></main><footer>Mini Library · Ứng dụng quản lý mượn trả sách</footer></div>;
}