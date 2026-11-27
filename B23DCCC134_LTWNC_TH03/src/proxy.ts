import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
  const role = request.auth?.user?.role;
  if (isAdminPath && role !== "admin") {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/my-posts/:path*", "/admin/:path*"]
};
