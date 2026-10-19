export type Category = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';
export interface Book { id: string; title: string; author: string; category: Category; year: number; stock: number; total: number; }
export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };
export type BookSearchFields = Pick<Book, 'title' | 'author'>;
export type NonEmpty<T> = T extends null | undefined | '' ? never : T;
export function isBook(value: unknown): value is Book {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === 'string' && typeof item.title === 'string' && typeof item.author === 'string' && typeof item.category === 'string' && typeof item.year === 'number' && typeof item.stock === 'number' && typeof item.total === 'number';
}