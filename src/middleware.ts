import { type NextFetchEvent, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { type NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent,
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register") ||
    req.nextUrl.pathname.startsWith("/lupa-password") ||
    req.nextUrl.pathname.startsWith("/reset-password")
  ) {
    return isAuthenticated
      ? NextResponse.redirect(new URL("/", req.url))
      : NextResponse.next();
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: `/login`,
    },
  });

  return authMiddleware(req, event);
}

export const config = {
  matcher: [
    // protected if authenticated
    "/login/:path*",
    "/register/:path*",
    "/lupa-password/:path*",
    "/reset-password/:path*",

    // protected if not authenticated
    "/my-frs/:path*",
    "/profil/:path*",
    "/ubah-password/:path*",
    "/my-trade-matkul/:path*",
  ],
};
