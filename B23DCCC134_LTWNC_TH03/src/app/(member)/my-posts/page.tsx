import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { can } from "@/lib/permissions";
import { listMine, parseStatus } from "@/lib/my-posts";
import { formatDate } from "@/lib/format";
import { PostForm } from "@/components/PostForm";
import { createPostAction, resolvePostAction } from "./actions";

export const metadata = { title: "Tin đăng của tôi", robots: { index: false } };
type Props = { searchParams: Promise<{ status?: string; limit?: string }> };

const statusLabel = (status: string) => status === "pending" ? "Chờ duyệt" : status === "approved" ? "Đang hiển thị" : "Đã ẩn";

export default async function MyPostsPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user?.email || !can(session.user.role, "post:view")) redirect("/login?callbackUrl=%2Fmy-posts");
  const params = await searchParams;
  const status = parseStatus(params.status);
  const parsedLimit = Number(params.limit ?? 8);
  const limit = Number.isInteger(parsedLimit) && parsedLimit >= 8 && parsedLimit <= 1000 ? parsedLimit : 8;
  const result = listMine(session.user.email, status, 0, limit);
  const nextUrl = `/my-posts?${status ? `status=${status}&` : ""}limit=${limit + 8}`;
  return <section>
    <h1>Tin đăng của tôi</h1>
    <PostForm action={createPostAction} />
    <section className="panel">
      <form method="GET" className="filters">
        <div><label htmlFor="status">Trạng thái</label><select id="status" name="status" defaultValue={status ?? ""}><option value="">Tất cả</option><option value="pending">Chờ duyệt</option><option value="approved">Đang hiển thị</option><option value="hidden">Đã ẩn</option></select></div>
        <input type="hidden" name="limit" value="8" />
        <button className="btn">Lọc</button>
      </form>
      <p>Hiển thị {result.items.length} / {result.total} tin</p>
      {result.items.length ? <table><thead><tr><th>Tiêu đề</th><th>Ngày</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
        <tbody>{result.items.map(post => <tr key={post.id}>
          <td>{post.title}</td><td>{formatDate(post.date)}</td><td>{post.resolved ? "Đã nhận lại" : statusLabel(post.status)}</td>
          <td>{post.status === "approved" && !post.resolved && <form action={resolvePostAction.bind(null, post.id)}><button className="btn success">Đánh dấu đã nhận lại</button></form>}</td>
        </tr>)}</tbody></table> : <p>Chưa có tin đăng phù hợp.</p>}
      {result.nextCursor !== null ? <p><a className="btn" href={nextUrl}>Xem thêm</a></p> : <p>Đã hiển thị hết tin</p>}
    </section>
  </section>;
}
