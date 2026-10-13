
import { DeadlineCard } from "./DeadlineCard";
import { withLoading } from "../../hoc/withLoading";
import type { Deadline } from "./types";

interface DeadlineListProps {
  items: Deadline[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function DeadlineListView({
  items,
  onToggle,
  onDelete,
}: DeadlineListProps) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h3>Chưa có bài tập nào</h3>
        <p>Thử đổi bộ lọc hoặc thêm một bài tập mới nhé.</p>
      </div>
    );
  }

  return (
    <div className="deadline-list">
      {items.map((deadline) => (
        <DeadlineCard
          key={deadline.id}
          deadline={deadline}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export const DeadlineList = withLoading(DeadlineListView);
