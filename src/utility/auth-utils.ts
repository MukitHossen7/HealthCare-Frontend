export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/setting"],
  patterns: [],
};

export const doctorProtectedRoutes: RouteConfig = {
  patterns: [/^\/doctor/],
  exact: [],
};

export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};
export const patientProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: [],
};

export const isAuthRoutes = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

export const isRoutesMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  if (routes.patterns.some((pattern: RegExp) => pattern.test(pathname))) {
    return true;
  }
};

export const getRouteOwner = (
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

export const getDefaultDashboardRoutes = (role: UserRole): string => {
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

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
) => {
  const routeOwner = getRouteOwner(redirectPath);
  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }
  if (routeOwner === role) {
    return true;
  }
  return false;
};
