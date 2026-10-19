import { describe, it, expect } from 'vitest';
import reducer, { replaceBooks } from './booksSlice';
import type { Book } from './bookTypes';
const sample: Book = {id:'x1',title:'React',author:'An',category:'CNTT',year:2024,stock:2,total:2};
describe('booksSlice reducer', () => {
 it('có trạng thái ban đầu rỗng', () => { const state = reducer(undefined, {type:'unknown'}); expect(state.items).toEqual([]); expect(state.status).toBe('idle'); });
 it('thay thế danh sách sách', () => { const state = reducer(undefined, replaceBooks([sample])); expect(state.items).toHaveLength(1); expect(state.items[0].title).toBe('React'); });
 it('chuyển sang loading khi bắt đầu tải', async () => { const { fetchBooks } = await import('./booksSlice'); const state = reducer(undefined, fetchBooks.pending('req1', undefined)); expect(state.status).toBe('loading'); });
 it('lưu lỗi khi tải thất bại', async () => { const { fetchBooks } = await import('./booksSlice'); const state = reducer(undefined, fetchBooks.rejected(new Error('fail'), 'req1', undefined, 'Lỗi API')); expect(state.status).toBe('failed'); expect(state.error).toBe('Lỗi API'); });
});