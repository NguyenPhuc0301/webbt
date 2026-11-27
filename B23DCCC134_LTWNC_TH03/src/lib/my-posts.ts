import { db } from "./db";
import type { Post, PostStatus } from "../types";
import type { PostInput } from "./post-validate";

export function parseStatus(value: string | null | undefined): PostStatus | undefined {
  return value === "pending" || value === "approved" || value === "hidden" ? value : undefined;
}

export function listMine(email: string, status?: PostStatus, cursor = 0, size = 8): {
  items: Post[]; nextCursor: number | null; total: number;
} {
  const matching = db.posts.filter((post) => post.authorEmail === email && (!status || post.status === status));
  const items = matching.slice(cursor, cursor + size).map((post) => ({ ...post }));
  const next = cursor + items.length;
  return { items, nextCursor: next < matching.length ? next : null, total: matching.length };
}

export function submitPost(email: string, input: PostInput): Post {
  const contactLabel = input.contactType || "Zalo";
  const post: Post = {
    id: db.nextPostId++,
    title: input.title.trim(),
    kind: input.kind as Post["kind"],
    category: input.category as Post["category"],
    place: input.place as Post["place"],
    date: input.date,
    description: `${input.description.trim()}\\nLiên hệ: ${contactLabel} ${input.contact.trim()}`,
    authorEmail: email,
    status: "pending",
    resolved: false
  };
  db.posts.unshift(post);
  return { ...post };
}

export function resolvePost(email: string, id: number): "not-found" | "forbidden" | "not-approved" | "ok" {
  const post = db.posts.find((item) => item.id === id);
  if (!post) return "not-found";
  if (post.authorEmail !== email) return "forbidden";
  if (post.status !== "approved") return "not-approved";
  post.resolved = true;
  return "ok";
}
