import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';
afterEach(() => vi.useRealTimers());
describe('useDebounce', () => { it('chỉ cập nhật sau đủ 300ms', () => { vi.useFakeTimers(); const { result, rerender } = renderHook(({ value }: { value: string }) => useDebounce(value, 300), { initialProps: { value: 'a' } }); rerender({ value: 'b' }); expect(result.current).toBe('a'); act(() => vi.advanceTimersByTime(299)); expect(result.current).toBe('a'); act(() => vi.advanceTimersByTime(1)); expect(result.current).toBe('b'); }); });
