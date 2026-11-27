import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getPublicPost } from "@/lib/posts";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };
export const revalidate = 30;

export async function generateStaticParams() {
  return db.posts.filter((post) => post.status === "approved" && !post.resolved).slice(0, 10).map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPublicPost(Number(id));
  if (!post) return { title: "Không tìm thấy tin đăng" };
  const title = `${post.title} – ${post.place}`;
  return { title, description: post.description, openGraph: { title, description: post.description } };
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const post = await getPublicPost(Number(id));
  if (!post) notFound();
  const updatedAt = new Date().toLocaleTimeString("vi-VN", { hour12: false });
  const origin = "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: origin },
      { "@type": "ListItem", position: 2, name: "Tin đăng", item: `${origin}/posts` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${origin}/posts/${post.id}` }
    ]
  };
  return (
    <article className="panel">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <h1>{post.title}</h1>
      <p><strong>Loại tin:</strong> {post.kind}</p>
      <p><strong>Danh mục:</strong> {post.category}</p>
      <p><strong>Địa điểm:</strong> {post.place}</p>
      <p><strong>Ngày:</strong> {formatDate(post.date)}</p>
      <p><strong>Người đăng:</strong> {post.authorEmail}</p>
      <p>{post.description}</p>
      <p className="muted">Cập nhật lúc: {updatedAt}</p>
    </article>
  );
}
