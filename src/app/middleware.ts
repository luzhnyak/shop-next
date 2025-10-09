// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

  // Якщо користувач не авторизований — не пускаємо в /admin
  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Якщо користувач уже авторизований — не пускаємо в /auth/*
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
