
import { useMemo } from "react";
import { Card } from "./components/Card";
import { DeadlineForm } from "./features/deadlines/DeadlineForm";
import { DeadlineFilter } from "./features/deadlines/DeadlineFilter";
import { DeadlineList } from "./features/deadlines/DeadlineList";
import { useDeadlines } from "./features/deadlines/useDeadlines";
import { isOverdue } from "./features/deadlines/deadlineUtils";
import type { DeadlineFilter as FilterType } from "./features/deadlines/types";
import "./index.css";

function App() {
  const {
    items,
    allItems,
    loading,
    error,
    filter,
    create,
    toggle,
    remove,
    changeFilter,
  } = useDeadlines();

  // Tính số lượng theo trạng thái từ danh sách gốc.
  const counts = useMemo<Record<FilterType, number>>(
    () => ({
      all: allItems.length,
      pending: allItems.filter(
        (item) =>
          !item.completed &&
          !isOverdue(item),
      ).length,
      overdue: allItems.filter(isOverdue).length,
      completed: allItems.filter(
        (item) => item.completed,
      ).length,
    }),
    [allItems],
  );

  const completedCount = counts.completed;
  const overdueCount = counts.overdue;
  const completionRate =
    allItems.length > 0
      ? Math.round((completedCount / allItems.length) * 100)
      : 0;

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-icon">✓</div>
            <span>Student<span className="brand-accent">Track</span></span>
          </div>

          <span className="header-badge">
            WORK SMARTER, STUDY BETTER
          </span>
        </div>
      </header>

      <div className="page-container">
        <section className="hero">
          <div>
            <span className="eyebrow">KHÔNG BỎ LỠ DEADLINE</span>
            <h1>Quản lý bài tập <span>thông minh.</span></h1>
            <p>
              Tất cả bài tập và thời hạn nộp của bạn,
              được sắp xếp gọn gàng trong một nơi.
            </p>
          </div>

          <div className="hero-decoration" aria-hidden="true">
            <div className="hero-decoration-inner">✦</div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Thống kê bài tập">
          <Card className="stat-card">
            <Card.Body>
              <span className="stat-label">Tổng bài tập</span>
              <strong className="stat-value">{allItems.length}</strong>
              <span className="stat-note">Tất cả môn học</span>
            </Card.Body>
          </Card>

          <Card className="stat-card">
            <Card.Body>
              <span className="stat-label">Chưa hoàn thành</span>
              <strong className="stat-value">
                {counts.pending + overdueCount}
              </strong>
              <span className="stat-note">Cần theo dõi</span>
            </Card.Body>
          </Card>

          <Card className="stat-card">
            <Card.Body>
              <span className="stat-label">Đã quá hạn</span>
              <strong className="stat-value stat-danger">
                {overdueCount}
              </strong>
              <span className="stat-note">Cần ưu tiên xử lý</span>
            </Card.Body>
          </Card>

          <Card className="stat-card">
            <Card.Body>
              <span className="stat-label">Tiến độ hoàn thành</span>
              <strong className="stat-value">
                {completionRate}%
              </strong>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Tiến độ hoàn thành"
                aria-valuenow={completionRate}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="progress-fill"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </Card.Body>
          </Card>
        </section>

        <section className="content-grid">
          <aside className="sidebar">
            <DeadlineForm
              onSubmit={(input) => {
                void create(input);
              }}
            />

            <Card className="tip-card">
              <Card.Body>
                <span className="tip-icon">💡</span>
                <h3>Mẹo học tập</h3>
                <p>
                  Ưu tiên những bài tập sắp đến hạn và có
                  mức độ quan trọng cao để quản lý thời gian
                  hiệu quả hơn.
                </p>
              </Card.Body>
            </Card>
          </aside>

          <section className="tasks-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">DANH SÁCH CỦA BẠN</span>
                <h2>Bài tập cần theo dõi</h2>
              </div>
              <span className="total-badge">
                {items.length} bài tập
              </span>
            </div>

            <DeadlineFilter
              value={filter}
              onChange={changeFilter}
              counts={{
                all: counts.all,
                pending: counts.pending,
                overdue: counts.overdue,
                completed: counts.completed,
              }}
            />

            {error && (
              <div className="error-banner" role="alert">
                {error}
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                >
                  Thử lại
                </button>
              </div>
            )}

            <DeadlineList
              loading={loading}
              items={items}
              onToggle={toggle}
              onDelete={remove}
            />
          </section>
        </section>

        <footer className="app-footer">
          StudentTrack · Quản lý deadline, làm chủ thời gian.
        </footer>
      </div>
    </main>
  );
}

export default App;
