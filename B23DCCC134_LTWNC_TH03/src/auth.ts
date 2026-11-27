import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { USERS } from "./data/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" }
      },
      async authorize(credentials) {
        const email = typeof credentials.email === "string" ? credentials.email : "";
        const password = typeof credentials.password === "string" ? credentials.password : "";
        const user = USERS.find((item) => item.email === email && item.password === password);
        if (!user) return null;
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.role = token.role ?? "member";
      return session;
    }
  }
});
