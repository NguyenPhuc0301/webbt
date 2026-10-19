import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
export interface BorrowedBook { id: string; title: string; author: string; category: string; borrowedAt: string; }
export type Notice = { type: 'success' | 'error'; message: string };
interface BorrowedState { items: BorrowedBook[]; notice: Notice | null; }
const initialState: BorrowedState = { items: [], notice: null };
const borrowedSlice = createSlice({ name: 'borrowed', initialState, reducers: {
 borrowBook(state, action: PayloadAction<BorrowedBook>) { if (!state.items.some(item => item.id === action.payload.id)) { state.items.push(action.payload); state.notice = { type: 'success', message: `Đã mượn sách “${action.payload.title}”.` }; } },
 returnBook(state, action: PayloadAction<{id:string}>) { const index = state.items.findIndex(item => item.id === action.payload.id); if (index >= 0) { const [returned] = state.items.splice(index, 1); state.notice = { type: 'success', message: `Đã trả sách “${returned.title}”.` }; } },
 setBorrowNotice(state, action: PayloadAction<Notice>) { state.notice = action.payload; },
 clearBorrowNotice(state) { state.notice = null; }
} });
export const { borrowBook, returnBook, setBorrowNotice, clearBorrowNotice } = borrowedSlice.actions;
export default borrowedSlice.reducer;