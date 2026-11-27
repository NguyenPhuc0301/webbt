"use server";
import { auth } from "@/auth";
import { can } from "@/lib/permissions";
import { toPostInput, validatePost, type PostFormState } from "@/lib/post-validate";
import { submitPost, resolvePost } from "@/lib/my-posts";
import { revalidatePath } from "next/cache";

export async function createPostAction(_prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  const session = await auth();
  const values = toPostInput(formData);
  if (!can(session?.user?.role, "post:create") || !session?.user?.email) {
    return { errors: {}, values, message: "Không có quyền" };
  }
  const errors = validatePost(values);
  if (Object.keys(errors).length) return { errors, values };
  submitPost(session.user.email, values);
  revalidatePath("/my-posts");
  return { errors: {}, values: {}, message: "Đã gửi tin, chờ kiểm duyệt", ok: true };
}

export async function resolvePostAction(id: number): Promise<void> {
  const session = await auth();
  if (!can(session?.user?.role, "post:resolve") || !session?.user?.email) throw new Error("Không có quyền");
  const result = resolvePost(session.user.email, id);
  if (result !== "ok") throw new Error(result === "forbidden" ? "Không có quyền" : "Không thể cập nhật tin");
  revalidatePath("/my-posts");
  revalidatePath("/posts");
  revalidatePath("/");
  revalidatePath(`/posts/${id}`);
}
