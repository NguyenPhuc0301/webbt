import { memo, useCallback } from 'react';
import type { Book } from '../features/books/bookTypes';
interface Props { book: Book; borrowed: boolean; onBorrow: (book: Book) => void; }
function BookCardComponent({ book, borrowed, onBorrow }: Props) {
 const handleBorrow = useCallback(() => onBorrow(book), [book, onBorrow]);
 return <article className="book-card"><div className="book-cover"><span>{book.category === 'CNTT' ? '⌘' : book.category === 'Kinh tế' ? '↗' : '文'}</span><small>{book.category}</small></div><div className="book-info"><span className="category-pill">{book.category}</span><h3>{book.title}</h3><p className="muted">Tác giả: {book.author}</p><p className="muted">Năm xuất bản: {book.year}</p><div className="book-card-bottom"><span className={book.stock > 0 ? 'stock available' : 'stock unavailable'}>{book.stock > 0 ? `Còn ${book.stock} cuốn` : 'Hết sách'}</span><button className="primary-button" onClick={handleBorrow} disabled={book.stock <= 0 || borrowed}>{borrowed ? 'Đang mượn' : book.stock <= 0 ? 'Hết sách' : 'Mượn sách'}</button></div></div></article>;
}
export const BookCard = memo(BookCardComponent);