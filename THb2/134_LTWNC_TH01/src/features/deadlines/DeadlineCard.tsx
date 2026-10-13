
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import {
  formatDate,
  getDeadlineLabel,
  getDaysRemaining,
} from "./deadlineUtils";
import type { Deadline } from "./types";

interface DeadlineCardProps {
  deadline: Deadline;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityLabels = {
  high: "Cao",
  medium: "Trung bình",
  low: "Thấp",
} satisfies Record<Deadline["priority"], string>;

export function DeadlineCard({
  deadline,
  onToggle,
  onDelete,
}: DeadlineCardProps) {
  const daysRemaining = getDaysRemaining(deadline.dueDate);
  const overdue = !deadline.completed && daysRemaining < 0;

  return (
    <Card className={`deadline-card ${
      deadline.completed ? "is-completed" : ""
    }`}>
      <Card.Header>
        <div className="deadline-card-heading">
          <span className="subject-label">{deadline.subject}</span>
          <span className={`priority priority-${deadline.priority}`}>
            Ưu tiên {priorityLabels[deadline.priority]}
          </span>
        </div>
      </Card.Header>

      <Card.Body>
        <h3 className="deadline-title">{deadline.title}</h3>

        <div className="deadline-meta">
          <span>📅 Hạn nộp: {formatDate(deadline.dueDate)}</span>
          <span
            className={`deadline-countdown ${
              overdue ? "overdue" : ""
            } ${deadline.completed ? "finished" : ""}`}
          >
            {deadline.completed
              ? "Đã hoàn thành"
              : getDeadlineLabel(deadline.dueDate)}
          </span>
        </div>
      </Card.Body>

      <Card.Footer>
        <Button
          variant={deadline.completed ? "secondary" : "primary"}
          onClick={() => onToggle(deadline.id)}
        >
          {deadline.completed
            ? "↩ Bỏ hoàn thành"
            : "✓ Hoàn thành"}
        </Button>

        <Button
          variant="danger"
          onClick={() => {
            if (
              window.confirm(
                `Bạn có chắc muốn xóa "${deadline.title}" không?`,
              )
            ) {
              onDelete(deadline.id);
            }
          }}
        >
          Xóa
        </Button>
      </Card.Footer>
    </Card>
  );
}
