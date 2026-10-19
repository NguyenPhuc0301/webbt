import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';
afterEach(() => vi.useRealTimers());
describe('useDebounce', () => { it('chỉ cập nhật giá trị sau khoảng delay', () => { vi.useFakeTimers(); const {result, rerender} = renderHook(({value}) => useDebounce(value,300), {initialProps:{value:'a'}}); rerender({value:'ab'}); expect(result.current).toBe('a'); act(() => { vi.advanceTimersByTime(300); }); expect(result.current).toBe('ab'); }); });