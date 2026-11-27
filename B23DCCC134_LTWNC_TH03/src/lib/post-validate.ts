import { CATEGORIES, KINDS, PLACES } from "../data/posts";
import type { Category, Kind, Place } from "../types";

export interface PostInput {
  title: string;
  kind: string;
  category: string;
  place: string;
  date: string;
  description: string;
  contactType: string;
  contact: string;
}
export type PostErrors = Partial<Record<keyof PostInput, string>>;
export interface PostFormState {
  errors: PostErrors;
  values: Partial<PostInput>;
  message?: string;
  ok?: boolean;
}

export function today(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function toPostInput(raw: FormData | Record<string, unknown>): PostInput {
  const read = (key: keyof PostInput): string => {
    const value = raw instanceof FormData ? raw.get(key) : raw[key];
    return typeof value === "string" ? value : "";
  };
  return {
    title: read("title"),
    kind: read("kind"),
    category: read("category"),
    place: read("place"),
    date: read("date"),
    description: read("description"),
    contactType: read("contactType") || "Zalo",
    contact: read("contact")
  };
}

export function validatePost(input: PostInput): PostErrors {
  const errors: PostErrors = {};
  const title = input.title.trim();
  if (title.length < 5) errors.title = "Tiêu đề tối thiểu 5 ký tự";
  else if (title.length > 80) errors.title = "Tiêu đề tối đa 80 ký tự";
  if (!KINDS.includes(input.kind as Kind)) errors.kind = "Hãy chọn loại tin";
  if (!CATEGORIES.includes(input.category as Category)) errors.category = "Hãy chọn danh mục";
  if (!PLACES.includes(input.place as Place)) errors.place = "Hãy chọn địa điểm";
  if (!input.date || !/^\\d{4}-\\d{2}-\\d{2}$/.test(input.date)) errors.date = "Hãy chọn ngày";
  else if (input.date > today()) errors.date = "Ngày không được ở tương lai";
  if (input.description.trim().length < 20) errors.description = "Mô tả tối thiểu 20 ký tự";
  switch (input.contactType) {
    case "Zalo":
      if (!/^0\\d{9}$/.test(input.contact)) errors.contact = "Số Zalo gồm 10 chữ số, bắt đầu bằng 0";
      break;
    case "SĐT":
      if (!/^0\\d{9}$/.test(input.contact)) errors.contact = "Số điện thoại gồm 10 chữ số, bắt đầu bằng 0";
      break;
    case "Email":
      if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(input.contact)) errors.contact = "Email không hợp lệ";
      break;
    default:
      errors.contactType = "Hãy chọn loại liên hệ";
  }
  return errors;
}
