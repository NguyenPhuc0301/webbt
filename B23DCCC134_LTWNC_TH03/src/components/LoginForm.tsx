"use client";
import { useActionState } from "react";
import { loginAction } from "@/app/login/actions";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, action, pending] = useActionState(loginAction, {});
  return <form action={action}>
    <input type="hidden" name="callbackUrl" value={callbackUrl} />
    <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required /></div>
    <div className="field"><label htmlFor="password">Mật khẩu</label><input id="password" name="password" type="password" required /></div>
    {state.error ? <p role="alert" className="error">{state.error}</p> : null}
    <button className="btn" disabled={pending}>{pending ? "Đang đăng nhập..." : "Đăng nhập"}</button>
    <p className="muted">Tài khoản thử nghiệm: sv01@ptit.edu.vn / sv123456</p>
  </form>;
}
