import { describe, it, expect } from 'vitest';
import { formatDuration } from './format';
describe('formatDuration', () => { it('định dạng 0 giây', () => expect(formatDuration(0)).toBe('0:00')); it('định dạng 67 giây', () => expect(formatDuration(67)).toBe('1:07')); it('định dạng 120 giây', () => expect(formatDuration(120)).toBe('2:00')); });
