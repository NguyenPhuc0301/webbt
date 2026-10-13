
import type { DeadlineFilter as FilterType } from "./types";

interface DeadlineFilterProps {
  value: FilterType;
  onChange: (filter: FilterType) => void;
  counts: Record<FilterType, number>;
}

const options: { value: FilterType; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chưa hoàn thành" },
  { value: "overdue", label: "Quá hạn" },
  { value: "completed", label: "Đã hoàn thành" },
];

export function DeadlineFilter({
  value,
  onChange,
  counts,
}: DeadlineFilterProps) {
  return (
    <div className="filter-bar" aria-label="Lọc bài tập">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`filter-button ${
            value === option.value ? "active" : ""
          }`}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          <span className="filter-count">{counts[option.value]}</span>
        </button>
      ))}
    </div>
  );
}
