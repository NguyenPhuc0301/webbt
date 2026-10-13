
import { useState, type FormEvent } from "react";
import { Button } from "../../components/Button";
import type {
  CreateDeadlineInput,
  Priority,
} from "./types";

interface DeadlineFormProps {
  onSubmit: (input: CreateDeadlineInput) => void;
}

export function DeadlineForm({ onSubmit }: DeadlineFormProps) {
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!subject.trim() || !title.trim() || !dueDate) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const [year, month, day] = dueDate.split("-").map(Number);
    const parsedDate = new Date(year, month - 1, day);

    if (
      parsedDate.getFullYear() !== year ||
      parsedDate.getMonth() !== month - 1 ||
      parsedDate.getDate() !== day
    ) {
      setError("Ngày hạn nộp không hợp lệ.");
      return;
    }

    setError("");

    onSubmit({
      subject: subject.trim(),
      title: title.trim(),
      dueDate,
      priority,
    });

    setSubject("");
    setTitle("");
    setDueDate("");
    setPriority("medium");
  }

  return (
    <form className="deadline-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">QUẢN LÝ HỌC TẬP</span>
          <h2>Thêm bài tập mới</h2>
        </div>
        <span className="form-icon">＋</span>
      </div>

      <div className="form-grid">
        <label className="form-field">
          Môn học
          <input
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="VD: Lập trình Web"
            maxLength={100}
            required
          />
        </label>

        <label className="form-field">
          Tên bài tập
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="VD: Bài thực hành số 1"
            maxLength={150}
            required
          />
        </label>

        <label className="form-field">
          Hạn nộp
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            required
          />
        </label>

        <label className="form-field">
          Độ ưu tiên
          <select
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as Priority)
            }
          >
            <option value="high">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option>
          </select>
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}

      <Button type="submit">+ Thêm bài tập</Button>
    </form>
  );
}
