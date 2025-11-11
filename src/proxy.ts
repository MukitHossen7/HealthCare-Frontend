import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT";

type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

const authRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
];

const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/setting"],
  patterns: [],
};

const doctorProtectedRoutes: RouteConfig = {
  patterns: [/^\/doctor/],
  exact: [],
};

const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};
const patientProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: [],
};

const isAuthRoutes = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

const isRoutesMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  if (routes.patterns.some((pattern: RegExp) => pattern.test(pathname))) {
    return true;
  }
};

const getRouteOwner = (
  pathname: string
): "ADMIN" | "PATIENT" | "DOCTOR" | "COMMON" | null => {
  if (isRoutesMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRoutesMatches(pathname, patientProtectedRoutes)) {
    return "PATIENT";
  }
  if (isRoutesMatches(pathname, doctorProtectedRoutes)) {
    return "DOCTOR";
  }
  if (isRoutesMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

const getDefaultDashboardRoutes = (role: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "DOCTOR") {
    return "/doctor/dashboard";
  }
  if (role === "PATIENT") {
    return "/dashboard";
  }
  return "/";
};

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value || null;

  let userRole: UserRole | null = null;
  if (accessToken) {
    const verifyToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    if (typeof verifyToken === "string") {
      cookieStore.delete("accessToken");
      cookieStore.delete("RefreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
    userRole = verifyToken.role as UserRole;
  }

  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoutes(pathname);

  // Rule: 1
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoutes(userRole as UserRole), request.url)
    );
  }
  // Rule: 2
  if (routeOwner === null) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);

    // return NextResponse.redirect(
    //   new URL(`/login?redirect=${pathname}`, request.url)
    // );
  }

  //Rule : 3
  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }

  // Rule : 4
  if (
    routeOwner === "ADMIN" ||
    routeOwner === "DOCTOR" ||
    routeOwner === "PATIENT"
  ) {
    if (routeOwner !== userRole) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoutes(userRole as UserRole), request.url)
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
