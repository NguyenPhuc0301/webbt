import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getBooks } from '../../api/booksApi';
import type { ApiResult, Book } from './bookTypes';
import { borrowBook, returnBook } from '../borrowed/borrowedSlice';
export type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
interface BooksState { items: Book[]; status: LoadStatus; error: string | null; }
const initialState: BooksState = { items: [], status: 'idle', error: null };
export const fetchBooks = createAsyncThunk<Book[], { shouldFail?: boolean } | undefined, { rejectValue: string }>('books/fetchBooks', async (arg, thunkApi) => {
 const result: ApiResult<Book[]> = await getBooks(arg?.shouldFail ?? false);
 if (!result.ok) return thunkApi.rejectWithValue(result.error);
 return result.data;
});
const booksSlice = createSlice({ name: 'books', initialState, reducers: { replaceBooks(state, action: PayloadAction<Book[]>) { state.items = action.payload; } }, extraReducers: builder => {
 builder.addCase(fetchBooks.pending, state => { state.status = 'loading'; state.error = null; }).addCase(fetchBooks.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; }).addCase(fetchBooks.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload ?? 'Đã có lỗi không xác định.'; });
 builder.addCase(borrowBook, (state, action) => { const book = state.items.find(item => item.id === action.payload.id); if (book && book.stock > 0) book.stock -= 1; });
 builder.addCase(returnBook, (state, action) => { const book = state.items.find(item => item.id === action.payload.id); if (book) book.stock = Math.min(book.total, book.stock + 1); });
} });
export const { replaceBooks } = booksSlice.actions;
export default booksSlice.reducer;