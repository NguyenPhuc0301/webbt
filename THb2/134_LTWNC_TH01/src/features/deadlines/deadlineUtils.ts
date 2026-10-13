
import type { Deadline, DeadlineFilter } from "./types";

// Chuyển chuỗi YYYY-MM-DD thành ngày theo múi giờ địa phương.
// Tránh lỗi lệch ngày khi parse trực tiếp chuỗi ngày.
export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
}

// Tính số ngày còn lại đến hạn nộp.
// Số âm có nghĩa là đã quá hạn.
export function getDaysRemaining(dueDate: string): number {
  const today = startOfDay(new Date());
  const due = startOfDay(parseLocalDate(dueDate));

  return Math.round(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
}

// Type Guard: xác định bài tập đã quá hạn hay chưa.
export function isOverdue(
  deadline: Deadline,
): deadline is Deadline {
  return (
    !deadline.completed &&
    getDaysRemaining(deadline.dueDate) < 0
  );
}

// Generic Utility: lọc mảng theo điều kiện bất kỳ.
export function filterItems<T>(
  items: T[],
  predicate: (item: T) => boolean,
): T[] {
  return items.filter(predicate);
}

// Lọc danh sách theo trạng thái.
export function filterDeadlines(
  deadlines: Deadline[],
  filter: DeadlineFilter,
): Deadline[] {
  switch (filter) {
    case "pending":
      return filterItems(
        deadlines,
        (item) =>
          !item.completed &&
          getDaysRemaining(item.dueDate) >= 0,
      );

    case "overdue":
      return filterItems(deadlines, isOverdue);

    case "completed":
      return filterItems(deadlines, (item) => item.completed);

    case "all":
    default:
      return deadlines;
  }
}

// Hiển thị số ngày còn lại hoặc quá hạn.
export function getDeadlineLabel(dueDate: string): string {
  const days = getDaysRemaining(dueDate);

  if (days < 0) {
    return `Quá hạn ${Math.abs(days)} ngày`;
  }

  if (days === 0) {
    return "Hạn nộp hôm nay";
  }

  return `Còn ${days} ngày`;
}

// Định dạng ngày theo kiểu Việt Nam.
export function formatDate(dateString: string): string {
  return parseLocalDate(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
