import { useEffect } from 'react';
import { useSessionStore } from './useSessionStore';
import CountdownBar from './CountdownBar';
export default function SessionBar() { const queue = useSessionStore((s) => s.queue); const index = useSessionStore((s) => s.currentIndex); const running = useSessionStore((s) => s.isRunning); const toggle = useSessionStore((s) => s.toggleRun); const next = useSessionStore((s) => s.next); const prev = useSessionStore((s) => s.prev); const current = queue[index];
  useEffect(() => { if (!running) return undefined; const timer = window.setInterval(() => useSessionStore.getState().tick(), 1000); return () => window.clearInterval(timer); }, [running]);
  return <footer className="session-bar"><div className="session-info"><strong>{current ? `Đang tập: ${current.name} – HLV ${current.trainer}` : 'Chưa bắt đầu buổi tập'}</strong><CountdownBar /></div><div className="session-controls"><button onClick={prev} disabled={index < 0}>Trước</button><button className="primary" onClick={toggle} disabled={index < 0}>{running ? 'Tạm dừng' : 'Bắt đầu'}</button><button onClick={next} disabled={index < 0}>Sau</button><small>Buổi tập: {queue.length} bài</small></div></footer>;
}
