import Link from "next/link";
import { loadPostsShift } from "@/lib/posts";
import { formatDate } from "@/lib/format";

type SearchParams = Promise<{ q?: string; kind?: string; sort?: string }>;

export default async function PostsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const posts = await loadPostsShift(params);
  const renderedAt = new Date().toLocaleTimeString("vi-VN", { hour12: false });
  return (
    <section className="panel">
      <h1>Tin đang hiển thị</h1>
      <form method="GET" className="filters">
        <div><label htmlFor="q">Tìm kiếm</label><input id="q" name="q" placeholder="Nhập tiêu đề..." defaultValue={params.q ?? ""} /></div>
        <div><label htmlFor="kind">Loại tin</label><select id="kind" name="kind" defaultValue={params.kind ?? ""}><option value="">Tất cả</option><option>Thất lạc</option><option>Nhặt được</option></select></div>
        <div><label htmlFor="sort">Sắp xếp</label><select id="sort" name="sort" defaultValue={params.sort ?? ""}><option value="">Mặc định</option><option value="date-desc">Mới nhất</option><option value="date-asc">Cũ nhất</option></select></div>
        <button className="btn" type="submit">Lọc</button>
      </form>
      <p>Có {posts.length} tin đang hiển thị</p>
      <p className="muted">Render lúc: {renderedAt}</p>
      {posts.length === 0 ? <p>Không có tin nào phù hợp.</p> : (
        <table><thead><tr><th>Tiêu đề</th><th>Loại tin</th><th>Địa điểm</th><th>Ngày</th></tr></thead>
          <tbody>{posts.map((post) => <tr key={post.id}><td><Link href={`/posts/${post.id}`}>{post.title}</Link></td><td>{post.kind}</td><td>{post.place}</td><td>{formatDate(post.date)}</td></tr>)}</tbody>
        </table>
      )}
    </section>
  );
}
