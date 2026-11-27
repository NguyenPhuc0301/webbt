"use client";
import { useActionState } from "react";
import { CATEGORIES, KINDS, PLACES } from "@/data/posts";
import type { PostFormState } from "@/lib/post-validate";

type Action = (prevState: PostFormState, formData: FormData) => Promise<PostFormState>;
const initialState: PostFormState = { errors: {}, values: {} };

export function PostForm({ action }: { action: Action }) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const v = state.values;
  const key = JSON.stringify(v);
  return <form action={formAction} key={key} className="panel">
    <h2>Đăng tin mới</h2>
    <div className="field"><label htmlFor="title">Tiêu đề</label><input id="title" name="title" defaultValue={v.title ?? ""} />{state.errors.title && <p role="alert" className="error">{state.errors.title}</p>}</div>
    <div className="form-grid">
      <div className="field"><label htmlFor="kind">Loại tin</label><select id="kind" name="kind" defaultValue={v.kind ?? ""}><option value="">-- Chọn --</option>{KINDS.map(x => <option key={x}>{x}</option>)}</select>{state.errors.kind && <p role="alert" className="error">{state.errors.kind}</p>}</div>
      <div className="field"><label htmlFor="category">Danh mục</label><select id="category" name="category" defaultValue={v.category ?? ""}><option value="">-- Chọn --</option>{CATEGORIES.map(x => <option key={x}>{x}</option>)}</select>{state.errors.category && <p role="alert" className="error">{state.errors.category}</p>}</div>
      <div className="field"><label htmlFor="place">Địa điểm</label><select id="place" name="place" defaultValue={v.place ?? ""}><option value="">-- Chọn --</option>{PLACES.map(x => <option key={x}>{x}</option>)}</select>{state.errors.place && <p role="alert" className="error">{state.errors.place}</p>}</div>
      <div className="field"><label htmlFor="date">Ngày</label><input id="date" name="date" type="date" defaultValue={v.date ?? ""} />{state.errors.date && <p role="alert" className="error">{state.errors.date}</p>}</div>
    </div>
    <div className="field"><label htmlFor="description">Mô tả</label><textarea id="description" name="description" defaultValue={v.description ?? ""} />{state.errors.description && <p role="alert" className="error">{state.errors.description}</p>}</div>
    <div className="form-grid">
      <div className="field"><label htmlFor="contactType">Loại liên hệ</label><select id="contactType" name="contactType" defaultValue={v.contactType ?? "Zalo"}><option>Zalo</option><option>SĐT</option><option>Email</option></select>{state.errors.contactType && <p role="alert" className="error">{state.errors.contactType}</p>}</div>
      <div className="field"><label htmlFor="contact">Thông tin liên hệ</label><input id="contact" name="contact" defaultValue={v.contact ?? ""} />{state.errors.contact && <p role="alert" className="error">{state.errors.contact}</p>}</div>
    </div>
    {state.message && <p role="status" className={state.ok ? "success-text" : "error"}>{state.message}</p>}
    <button className="btn" disabled={pending}>{pending ? "Đang gửi..." : "Đăng tin"}</button>
  </form>;
}
