import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { can } from "@/lib/permissions";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { moderatePost } from "./actions";

export const metadata = { robots: { index: false } };

export default async function AdminPage() {
  const session = await auth();
  if (!can(session?.user?.role, "post:moderate")) redirect("/forbidden");
  const pending = db.posts.filter((post) => post.status === "pending");
  const counts = {
    pending: pending.length,
    approved: db.posts.filter((post) => post.status === "approved").length,
    hidden: db.posts.filter((post) => post.status === "hidden").length
  };
  return <section className="panel">
    <h1>Kiểm duyệt tin đăng</h1>
    <p>Chờ duyệt: {counts.pending} | Đang hiển thị: {counts.approved} | Đã ẩn: {counts.hidden}</p>
    {pending.length === 0 ? <p>Không có tin chờ duyệt.</p> : <table>
      <thead><tr><th>Tiêu đề</th><th>Ngày</th><th>Email người đăng</th><th>Thao tác</th></tr></thead>
      <tbody>{pending.map((post) => <tr key={post.id}>
        <td>{post.title}</td><td>{formatDate(post.date)}</td><td>{post.authorEmail}</td>
        <td><div className="actions">
          <form action={moderatePost.bind(null, post.id, "approved")}><button className="btn success">Duyệt</button></form>
          <form action={moderatePost.bind(null, post.id, "hidden")}><button className="btn danger">Ẩn</button></form>
        </div></td>
      </tr>)}</tbody>
    </table>}
  </section>;
}
