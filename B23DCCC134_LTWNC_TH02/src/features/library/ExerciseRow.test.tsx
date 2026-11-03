import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseRow from './ExerciseRow';
import type { Exercise } from '../../types';
const exercise: Exercise = { id: 'e1', name: 'Đẩy tạ đơn 1', trainer: 'Minh Khang', group: 'Ngực', duration: 30 };
describe('ExerciseRow', () => { it('hiển thị tên bài tập và thời lượng 0:30', () => { render(<ExerciseRow exercise={exercise} number={1} saved={false} canAddRoutine onStart={vi.fn()} onToggleSaved={vi.fn()} onAddSession={vi.fn()} onAddRoutine={vi.fn()} />); expect(screen.getByText('Đẩy tạ đơn 1')).toBeInTheDocument(); expect(screen.getByText('0:30')).toBeInTheDocument(); }); it('bấm Bắt đầu gọi callback với đúng bài tập', () => { const start = vi.fn(); render(<ExerciseRow exercise={exercise} number={1} saved={false} canAddRoutine onStart={start} onToggleSaved={vi.fn()} onAddSession={vi.fn()} onAddRoutine={vi.fn()} />); fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' })); expect(start).toHaveBeenCalledWith(exercise); }); });
