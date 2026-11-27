import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/LoginForm";

type Props = { searchParams: Promise<{ callbackUrl?: string }> };
export default async function LoginPage({ searchParams }: Props) {
  const session = await auth();
  if (session?.user) redirect("/");
  const params = await searchParams;
  return <section className="panel" style={{ maxWidth: 480, marginInline: "auto" }}>
    <h1>Đăng nhập</h1>
    <LoginForm callbackUrl={params.callbackUrl ?? "/my-posts"} />
  </section>;
}
