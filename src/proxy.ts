import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig, isPublicAdminPath } from "@/auth.config";

const { auth } = NextAuth(authConfig);

/**
 * Redirects signed-out visitors away from /admin pages before they render.
 * This is an optimistic check only: every admin page and server action
 * re-validates the session against the database (see requireAdmin).
 */
export default auth((request) => {
  const { pathname, search } = request.nextUrl;
  if (request.auth?.user || isPublicAdminPath(pathname)) return NextResponse.next();

  const loginUrl = new URL("/admin/login", request.nextUrl);
  loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
});

export const config = {
  matcher: ["/admin/:path*"],
};
