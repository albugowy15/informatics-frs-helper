import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    "/my-frs/:path*",
    "/profil/:path*",
    "/ubah-password/:path*",
    "/my-trade-matkul/:path*",
  ],
};
