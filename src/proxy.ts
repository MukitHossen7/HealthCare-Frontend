import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;
  const protectedPaths = [
    "/dashboard",
    "/profile",
    "/setting",
    "/appointments",
  ];
  const authPaths = ["/login", "/register", "/forgot-password"];

  const isProtectedRoute = protectedPaths.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authPaths.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/forgot-password"],
};
