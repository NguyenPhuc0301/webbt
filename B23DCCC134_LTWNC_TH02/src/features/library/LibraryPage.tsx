import { FixedSizeList, type ListChildComponentProps } from 'react-window';
import { useCallback, useMemo, useState } from 'react';
import { EXERCISES, GROUPS } from '../../data/exercises';
import type { Exercise, MuscleGroup, SortMode } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import { useSavedStore } from '../saved/useSavedStore';
import { useSessionStore } from '../session/useSessionStore';
import { useRoutines, useRoutineDispatch } from '../routines/RoutineContext';
import ExerciseRow from './ExerciseRow';
interface RowData { items: Exercise[]; savedIds: string[]; canAddRoutine: boolean; start: (e: Exercise) => void; toggleSaved: (id: string) => void; addSession: (e: Exercise) => void; addRoutine: (e: Exercise) => void; }
function VirtualRow({ index, style, data }: ListChildComponentProps<RowData>) { const exercise = data.items[index]; return <div style={style}><ExerciseRow exercise={exercise} number={index + 1} saved={data.savedIds.includes(exercise.id)} canAddRoutine={data.canAddRoutine} onStart={data.start} onToggleSaved={data.toggleSaved} onAddSession={data.addSession} onAddRoutine={data.addRoutine} /></div>; }
export default function LibraryPage() {
  const [keyword, setKeyword] = useState(''); const [group, setGroup] = useState<'Tất cả' | MuscleGroup>('Tất cả'); const [sort, setSort] = useState<SortMode>('default'); const [selectedRoutine, setSelectedRoutine] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300); const savedIds = useSavedStore((s) => s.ids); const toggleSaved = useSavedStore((s) => s.toggle); const routines = useRoutines(); const dispatch = useRoutineDispatch();
  const filtered = useMemo(() => { const term = debouncedKeyword.trim().toLocaleLowerCase('vi'); const result = EXERCISES.filter((e) => (group === 'Tất cả' || e.group === group) && (!term || e.name.toLocaleLowerCase('vi').includes(term) || e.trainer.toLocaleLowerCase('vi').includes(term))); if (sort === 'name') return [...result].sort((a, b) => a.name.localeCompare(b.name, 'vi')); if (sort === 'duration') return [...result].sort((a, b) => a.duration - b.duration); return result; }, [debouncedKeyword, group, sort]);
  const handleKeywordShift = useCallback((value: string) => setKeyword(value), []);
  const start = useCallback((exercise: Exercise) => useSessionStore.getState().startSession(filtered, filtered.findIndex((e) => e.id === exercise.id)), [filtered]);
  const addSession = useCallback((exercise: Exercise) => useSessionStore.getState().addToSession(exercise), []);
  const addRoutine = useCallback((exercise: Exercise) => { if (selectedRoutine) dispatch({ type: 'addExercise', id: selectedRoutine, exerciseId: exercise.id }); }, [dispatch, selectedRoutine]);
  const rowData = useMemo<RowData>(() => ({ items: filtered, savedIds, canAddRoutine: Boolean(selectedRoutine), start, toggleSaved, addSession, addRoutine }), [filtered, savedIds, selectedRoutine, start, toggleSaved, addSession, addRoutine]);
  return <section><div className="page-heading"><div><p className="eyebrow">THƯ VIỆN LUYỆN TẬP</p><h1>Kho bài tập</h1><p>Khám phá 10.000 bài tập được thiết kế cho bạn.</p></div><span className="count-chip">10.000 bài tập</span></div>
    <div className="filters"><div className="field search-field"><label htmlFor="keyword">Tìm kiếm</label><input id="keyword" value={keyword} onChange={(e) => handleKeywordShift(e.target.value)} placeholder="Tên bài tập hoặc huấn luyện viên..." /></div><div className="field"><label htmlFor="group">Nhóm cơ</label><select id="group" value={group} onChange={(e) => setGroup(e.target.value as 'Tất cả' | MuscleGroup)}><option>Tất cả</option>{GROUPS.map((g) => <option key={g}>{g}</option>)}</select></div><div className="field"><label htmlFor="sort">Sắp xếp</label><select id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortMode)}><option value="default">Mặc định</option><option value="name">Tên A–Z</option><option value="duration">Thời lượng tăng dần</option></select></div><div className="field"><label htmlFor="routine-select">Giáo án đang chọn</label><select id="routine-select" value={selectedRoutine} onChange={(e) => setSelectedRoutine(e.target.value)}><option value="">Chưa chọn</option>{routines.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}</select></div></div>
    <p className="result-count">Tìm thấy <strong>{filtered.length}</strong> bài tập</p>
    {filtered.length ? <div className="list-shell"><div className="list-header"><span>#</span><span>Bài tập</span><span>Thời lượng</span><span>Thao tác</span></div><FixedSizeList height={560} width="100%" itemCount={filtered.length} itemSize={56} itemData={rowData} itemKey={(index, data) => data.items[index].id}>{VirtualRow}</FixedSizeList></div> : <div className="empty-state">Không tìm thấy bài tập nào.</div>}
  </section>;
}
