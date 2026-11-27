"use server";
import { auth } from "@/auth";
import { can } from "@/lib/permissions";
import { db } from "@/lib/db";
import type { PostStatus } from "@/types";
import { revalidatePath } from "next/cache";

export async function moderatePost(id: number, status: PostStatus): Promise<void> {
  const session = await auth();
  if (!can(session?.user?.role, "post:moderate")) throw new Error("Không có quyền");
  if (status !== "approved" && status !== "hidden") throw new Error("Trạng thái không hợp lệ");
  const post = db.posts.find((item) => item.id === id);
  if (!post || post.status !== "pending") return;
  post.status = status;
  revalidatePath("/admin");
  revalidatePath("/posts");
  revalidatePath("/");
  revalidatePath(`/posts/${id}`);
}
