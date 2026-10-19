import { useCallback } from 'react';
import { create } from 'zustand';
type CategoryFilter = 'Tất cả' | 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';
interface FilterState { keyword: string; category: CategoryFilter; setKeyword: (value: string) => void; setCategory: (value: CategoryFilter) => void; }
const useFilterStore = create<FilterState>(set => ({ keyword: '', category: 'Tất cả', setKeyword: keyword => set({keyword}), setCategory: category => set({category}) }));
export function useLibraryFilters() { const keyword = useFilterStore(s => s.keyword); const category = useFilterStore(s => s.category); const setKeyword = useFilterStore(s => s.setKeyword); const setCategory = useFilterStore(s => s.setCategory); return { keyword, category, setKeyword: useCallback((v: string) => setKeyword(v), [setKeyword]), setCategory: useCallback((v: CategoryFilter) => setCategory(v), [setCategory]) }; }