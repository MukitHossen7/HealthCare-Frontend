import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface IUserInterface {
  id: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  exp: number;
  iat: number;
}

const authRoutes = ["/login", "/register", "/forgot-password"];
const roleBaseRoutes = {
  ADMIN: ["/admin/dashboard"],
  DOCTOR: ["/doctor/dashboard"],
  PATIENT: ["/patient/dashboard"],
};

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // if token is not available
  if (!accessToken && !refreshToken && !authRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  // if token is available
  let user: IUserInterface | null = null;
  if (accessToken) {
    try {
      user = jwtDecode(accessToken);
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  // if not available user/accessToken but refreshToken is available
  if (!user && refreshToken) {
    try {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
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
    } catch (error) {
      console.log("Error refreshing token", error);
      const response = NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  //If user is available that the user gone her desire routes
  if (user) {
    const allowedRoutes = user ? roleBaseRoutes[user.role] : [];

    if (
      allowedRoutes &&
      allowedRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(`/unauthorized`, request.url));
    }
  }

  //if user exists but user go to login page this is bad
  if (user && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/`, request.url));
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
