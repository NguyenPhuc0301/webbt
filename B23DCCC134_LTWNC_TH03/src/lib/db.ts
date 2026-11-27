import { generatePosts } from "../data/posts";
import type { Post } from "../types";

interface Db {
  posts: Post[];
  nextPostId: number;
}

const g = globalThis as typeof globalThis & { __foundDb?: Db };

export const db: Db = (g.__foundDb ??= {
  posts: generatePosts(36),
  nextPostId: 37
});
