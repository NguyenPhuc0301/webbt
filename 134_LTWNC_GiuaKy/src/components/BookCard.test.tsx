import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookCard } from './BookCard';
import type { Book } from '../features/books/bookTypes';
const book: Book = {id:'x1',title:'React cơ bản',author:'Nguyễn An',category:'CNTT',year:2024,stock:2,total:2};
describe('BookCard', () => {
 it('hiển thị đúng tên sách, tác giả và số lượng', () => { render(<BookCard book={book} borrowed={false} onBorrow={vi.fn()}/>); expect(screen.getByText('React cơ bản')).toBeInTheDocument(); expect(screen.getByText('Tác giả: Nguyễn An')).toBeInTheDocument(); expect(screen.getByText('Còn 2 cuốn')).toBeInTheDocument(); });
 it('click Mượn sách gọi callback với đúng sách', async () => { const user = userEvent.setup(); const onBorrow = vi.fn(); render(<BookCard book={book} borrowed={false} onBorrow={onBorrow}/>); await user.click(screen.getByRole('button', {name:'Mượn sách'})); expect(onBorrow).toHaveBeenCalledTimes(1); expect(onBorrow).toHaveBeenCalledWith(book); });
 it('vô hiệu hóa nút khi hết sách', () => { render(<BookCard book={{...book,stock:0}} borrowed={false} onBorrow={vi.fn()}/>); expect(screen.getByRole('button', {name:'Hết sách'})).toBeDisabled(); });
});