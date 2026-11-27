"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();
  return (
    <header className="header">
      <div className="header-inner">
        <Link className="brand" href="/">PTIT Found</Link>
        <nav className="nav">
          <Link href="/">Trang chủ</Link>
          <Link href="/posts">Tin đăng</Link>
          {status === "loading" ? null : session?.user ? (
            <>
              <span>Xin chào, {session.user.name} ({session.user.role})</span>
              <Link href="/my-posts">Tin của tôi</Link>
              {session.user.role === "admin" ? <Link href="/admin">Quản trị</Link> : null}
              <button onClick={() => signOut({ callbackUrl: "/" })}>Đăng xuất</button>
            </>
          ) : <Link href="/login">Đăng nhập</Link>}
        </nav>
      </div>
    </header>
  );
}
