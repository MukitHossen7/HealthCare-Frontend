import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  console.log(token);
  console.log(pathname);
  const protectedPaths = [
    "/dashboard/*",
    "/profile",
    "/setting",
    "/appointments",
  ];
  const authPaths = ["/login", "/register", "/forgot-password"];

  const isProtectedRoute = protectedPaths.some((path) => {
    pathname.startsWith(path);
  });
  const isAuthRoute = authPaths.some((path) => {
    pathname.startsWith(path);
  });

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/forgot-password"],
};
