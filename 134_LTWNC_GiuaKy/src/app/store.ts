import { configureStore, type Middleware } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import borrowedReducer, { borrowBook, setBorrowNotice } from '../features/borrowed/borrowedSlice';

// Middleware tự viết: ngăn mượn quá 3 cuốn cùng lúc.
const borrowLimitMiddleware: Middleware = api => next => action => {
  if (borrowBook.match(action)) {
    const state = api.getState() as { borrowed: { items: { id: string }[] } };
    if (state.borrowed.items.length >= 3) {
      api.dispatch(setBorrowNotice({ type: 'error', message: 'Bạn chỉ được mượn tối đa 3 cuốn sách cùng lúc.' }));
      return;
    }
  }
  return next(action);
};
export const store = configureStore({ reducer: { books: booksReducer, borrowed: borrowedReducer }, middleware: getDefault => getDefault().concat(borrowLimitMiddleware) });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;