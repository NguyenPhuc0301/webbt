import type { DefaultSession } from "next-auth";
import type { Role } from "../types";

declare module "next-auth" {
  interface User { role: Role; }
  interface Session {
    user: DefaultSession["user"] & { role: Role };
  }
}
declare module "next-auth/jwt" {
  interface JWT { role?: Role; }
}
