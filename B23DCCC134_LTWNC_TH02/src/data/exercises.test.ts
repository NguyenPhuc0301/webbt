import { describe, it, expect } from 'vitest';
import { generateExercises } from './exercises';
describe('generateExercises', () => { const items = generateExercises(10000); it('sinh đủ 10000 bài tập', () => expect(items).toHaveLength(10000)); it('có id không trùng nhau', () => expect(new Set(items.map((e) => e.id)).size).toBe(10000)); it('thời lượng luôn từ 30 đến 120 giây', () => expect(items.every((e) => e.duration >= 30 && e.duration <= 120)).toBe(true)); });
