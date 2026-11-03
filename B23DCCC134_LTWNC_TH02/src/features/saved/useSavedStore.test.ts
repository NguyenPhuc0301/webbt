import { beforeEach, describe, it, expect } from 'vitest';
import { useSavedStore } from './useSavedStore';
beforeEach(() => { localStorage.clear(); useSavedStore.setState({ ids: [] }); });
describe('saved store', () => { it('lưu bài tập vào danh sách', () => { useSavedStore.getState().toggle('e1'); expect(useSavedStore.getState().ids).toEqual(['e1']); }); it('bỏ lưu bài tập đã có', () => { useSavedStore.setState({ ids: ['e1'] }); useSavedStore.getState().toggle('e1'); expect(useSavedStore.getState().ids).toEqual([]); }); });
