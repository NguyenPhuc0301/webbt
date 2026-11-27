import { db } from "./db";
import type { Kind, Post } from "../types";

export interface PublicPostFilters {
  q?: string;
  kind?: string;
  sort?: string;
}

export async function loadPostsShift(filters: PublicPostFilters = {}): Promise<Post[]> {
  await new Promise<void>((resolve) => setTimeout(resolve, 600));
  const q = filters.q?.trim().toLocaleLowerCase("vi");
  let posts = db.posts.filter((post) => post.status === "approved" && !post.resolved);
  if (q) posts = posts.filter((post) => post.title.toLocaleLowerCase("vi").includes(q));
  if (filters.kind === "Thất lạc" || filters.kind === "Nhặt được") {
    posts = posts.filter((post) => post.kind === filters.kind);
  }
  posts = [...posts];
  if (filters.sort === "date-desc") posts.sort((a, b) => b.date.localeCompare(a.date));
  if (filters.sort === "date-asc") posts.sort((a, b) => a.date.localeCompare(b.date));
  return posts;
}

export async function getPublicPost(id: number): Promise<Post | undefined> {
  const post = db.posts.find((item) => item.id === id && item.status === "approved" && !item.resolved);
  return post ? { ...post } : undefined;
}

export async function getPublicPostCount(): Promise<number> {
  return db.posts.filter((post) => post.status === "approved" && !post.resolved).length;
}
