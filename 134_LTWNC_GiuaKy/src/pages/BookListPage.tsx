import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { BookCard } from '../components/BookCard';
import type { Book, Category } from '../features/books/bookTypes';
import { borrowBook } from '../features/borrowed/borrowedSlice';
import { fetchBooks } from '../features/books/booksSlice';
import { useDebounce } from '../hooks/useDebounce';
import { useLibraryFilters } from '../features/books/useLibraryFilters';
const categories = ['Tất cả', 'CNTT', 'Kinh tế', 'Ngoại ngữ'] as const;
export function BookListPage() {
 const dispatch = useAppDispatch(); const { items, status, error } = useAppSelector(s => s.books); const borrowed = useAppSelector(s => s.borrowed.items);
 const { keyword, setKeyword, category, setCategory } = useLibraryFilters(); const debouncedKeyword = useDebounce(keyword, 300);
 const filteredBooks = useMemo(() => { const q = debouncedKeyword.trim().toLocaleLowerCase('vi'); return items.filter(book => (category === 'Tất cả' || book.category === category) && (!q || `${book.title} ${book.author}`.toLocaleLowerCase('vi').includes(q))); }, [items, debouncedKeyword, category]);
 const handleBorrow = useCallback((book: Book) => { if (book.stock <= 0) return; dispatch(borrowBook({ id: book.id, title: book.title, author: book.author, category: book.category, borrowedAt: new Date().toISOString() })); }, [dispatch]);
 const isBorrowed = useCallback((id: string) => borrowed.some(item => item.id === id), [borrowed]);
 if (status === 'loading' || status === 'idle') return <section className="loading-panel"><div className="spinner"/><h2>Đang tải danh sách sách...</h2><p>Vui lòng chờ trong giây lát.</p></section>;
 if (status === 'failed') return <section className="error-panel"><h2>Không tải được dữ liệu</h2><p>{error}</p><button className="primary-button" onClick={() => { dispatch(fetchBooks()); }}>Thử tải lại</button><p className="hint">Nếu lỗi tiếp tục xuất hiện, hãy kiểm tra kết nối và thử lại.</p></section>;
 return <><section className="page-heading"><div><p className="eyebrow">KHÔNG GIAN HỌC TẬP CỦA BẠN</p><h1>Khám phá thư viện</h1><p className="subtitle">Tìm cuốn sách phù hợp và quản lý việc mượn sách dễ dàng.</p></div><div className="heading-stat"><strong>{items.length}</strong><span>đầu sách</span></div></section><section className="filter-panel"><label className="search-box"><span>⌕</span><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Tìm theo tên sách hoặc tác giả..." aria-label="Tìm kiếm sách"/><kbd>⌘ K</kbd></label><div className="category-filters" aria-label="Lọc thể loại">{categories.map(item => <button key={item} className={category === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory(item as Category | 'Tất cả')}>{item}</button>)}</div></section><div className="results-line"><span>{filteredBooks.length} kết quả</span><span>Sắp xếp theo: <b>Tên sách</b></span></div>{filteredBooks.length ? <section className="book-grid">{filteredBooks.map(book => <BookCard key={book.id} book={book} borrowed={isBorrowed(book.id)} onBorrow={handleBorrow}/>)}</section> : <section className="empty-state"><span>⌕</span><h2>Không tìm thấy sách</h2><p>Thử từ khóa khác hoặc thay đổi bộ lọc thể loại.</p></section>}</>;
}