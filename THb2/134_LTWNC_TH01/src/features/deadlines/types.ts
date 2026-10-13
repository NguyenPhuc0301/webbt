
export type Priority = "low" | "medium" | "high";

export type DeadlineFilter =
  | "all"
  | "pending"
  | "overdue"
  | "completed";

export interface Deadline {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

// Utility Type: bỏ id, completed và createdAt
// khi tạo một bài tập mới.
export type CreateDeadlineInput = Omit<
  Deadline,
  "id" | "completed" | "createdAt"
>;

// Partial: chỉ cập nhật những trường cần thiết.
export type UpdateDeadlineInput = Partial<
  Pick<Deadline, "subject" | "title" | "dueDate" | "priority">
>;

export interface DeadlineState {
  items: Deadline[];
  loading: boolean;
  error: string | null;
  filter: DeadlineFilter;
}
