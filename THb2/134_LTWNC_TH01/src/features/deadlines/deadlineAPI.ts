
import type {
  CreateDeadlineInput,
  Deadline,
} from "./types";

const mockDeadlines: Deadline[] = [
  {
    id: "1",
    subject: "Lập trình Web nâng cao",
    title: "Bài thực hành React và TypeScript",
    dueDate: "2026-10-15",
    priority: "high",
    completed: false,
    createdAt: "2026-10-10T08:00:00.000Z",
  },
  {
    id: "2",
    subject: "Cơ sở dữ liệu",
    title: "Thiết kế cơ sở dữ liệu",
    dueDate: "2026-10-18",
    priority: "medium",
    completed: false,
    createdAt: "2026-10-11T08:00:00.000Z",
  },
  {
    id: "3",
    subject: "Phân tích nghiệp vụ",
    title: "Hoàn thiện tài liệu yêu cầu",
    dueDate: "2026-10-20",
    priority: "low",
    completed: false,
    createdAt: "2026-10-12T08:00:00.000Z",
  },
  {
    id: "4",
    subject: "Lập trình Web nâng cao",
    title: "Ôn tập TypeScript nâng cao",
    dueDate: "2026-10-12",
    priority: "high",
    completed: false,
    createdAt: "2026-10-09T08:00:00.000Z",
  },
  {
    id: "5",
    subject: "Phát triển ứng dụng",
    title: "Nộp báo cáo thực hành",
    dueDate: "2026-10-11",
    priority: "medium",
    completed: true,
    createdAt: "2026-10-08T08:00:00.000Z",
  },
];

// Giả lập API GET danh sách bài tập.
export async function fetchDeadlines(): Promise<Deadline[]> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 700);
  });

  return mockDeadlines.map((item) => ({ ...item }));
}

// Giả lập API POST tạo bài tập.
export async function createDeadlineAPI(
  input: CreateDeadlineInput,
): Promise<Deadline> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 300);
  });

  return {
    ...input,
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}
