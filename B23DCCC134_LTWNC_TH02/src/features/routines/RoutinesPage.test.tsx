import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { RoutineProvider } from './RoutineContext';
import RoutinesPage from './RoutinesPage';
function renderWithProviders() { return render(<RoutineProvider><MemoryRouter><RoutinesPage /></MemoryRouter></RoutineProvider>); }
describe('RoutinesPage', () => { it('báo lỗi khi tạo giáo án với tên trống', async () => { renderWithProviders(); await userEvent.click(screen.getByRole('button', { name: 'Tạo' })); expect(screen.getByText('Tên giáo án không được để trống')).toBeInTheDocument(); }); it('tạo giáo án và hiển thị tên trong danh sách', async () => { renderWithProviders(); await userEvent.type(screen.getByLabelText('Tên giáo án'), 'Ngày ngực'); await userEvent.click(screen.getByRole('button', { name: 'Tạo' })); expect(screen.getByRole('heading', { name: 'Ngày ngực' })).toBeInTheDocument(); }); });
