import Link from "next/link";
import { getPublicPostCount } from "@/lib/posts";

export default async function HomePage() {
  const count = await getPublicPostCount();
  return (
    <section className="hero">
      <p className="badge">Cộng đồng PTIT</p>
      <h1>PTIT Found – Tìm đồ thất lạc</h1>
      <p>Nơi kết nối người đánh rơi và người nhặt được đồ trong trường.</p>
      <h2>{count} tin đang hiển thị</h2>
      <Link className="btn" href="/posts">Xem tất cả tin</Link>
    </section>
  );
}
