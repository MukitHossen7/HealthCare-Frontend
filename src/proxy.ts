import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface IDecodedUser {
  id: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  exp: number;
  iat: number;
}

const authRoutes = ["/login", "/register", "/forgot-password"];
const roleBaseRoutes = {
  ADMIN: ["/admin/dashboard", "/admin/dashboard/manage-doctors"],
  DOCTOR: ["/doctor/dashboard"],
  PATIENT: ["/patient/dashboard"],
};

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  // no token => redirect to login
  if (!accessToken && !refreshToken && !authRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  // try to decode access token
  let user: IDecodedUser | null = null;
  if (accessToken) {
    try {
      user = jwtDecode<IDecodedUser>(accessToken);
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  // if access token expired but refresh token exists
  if (user && user!.exp * 1000 < Date.now() && refreshToken) {
    try {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (refreshRes.ok) {
        const newAccessToken = request.cookies.get("accessToken")?.value;
        user = jwtDecode(newAccessToken!);
        return NextResponse.next();
      } else {
        const response = NextResponse.redirect(
          new URL(`/login?redirect=${pathname}`, request.url)
        );
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }
    } catch (err) {
      console.log("Error refreshing token:", err);
      const response = NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }
  // role-based route check
  if (user) {
    const allowedRoutes = user ? roleBaseRoutes[user.role] : [];

    if (
      allowedRoutes &&
      allowedRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.next();
    } else if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.redirect(new URL(`/unauthorized`, request.url));
    }
  }

  // if already logged in but visiting login page
  if (user && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/doctor/dashboard/:path*",
    "/patient/dashboard/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};

// import { NextResponse, NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function proxy(request: NextRequest) {
//   const token = request.cookies.get("accessToken")?.value;
//   const { pathname } = request.nextUrl;
//   const protectedPaths = [
//     "/dashboard",
//     "/profile",
//     "/setting",
//     "/appointments",
//   ];
//   const authPaths = ["/login", "/register", "/forgot-password"];

//   const isProtectedRoute = protectedPaths.some((route) =>
//     pathname.startsWith(route)
//   );
//   const isAuthRoute = authPaths.some((route) => pathname.startsWith(route));

//   if (isProtectedRoute && !token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (isAuthRoute && token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/login", "/register", "/forgot-password"],
// };
