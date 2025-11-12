/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import * as z from "zod";
import { parse } from "cookie";
import { redirect } from "next/navigation";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import {
  getDefaultDashboardRoutes,
  isValidRedirectForRole,
  UserRole,
} from "@/utility/auth-utils";
import { setCookies } from "./tokenHandler";

const loginValidationZodSchema = z.object({
  email: z.email({
    error: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." })
    .max(10, { error: "Password must not exceed 10 characters." }),
});

export const loginUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect") || null;
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const loginData = {
      password: formData.get("password"),
      email: formData.get("email"),
    };

    const validatedFields = loginValidationZodSchema.safeParse(loginData);
    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await res.json();

    const setCookieHeaders = res.headers.getSetCookie();
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);
        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No set cookies headers found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }
    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    await setCookies("accessToken", accessTokenObject.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await setCookies("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    const verifyToken: JwtPayload | string = jwt.verify(
      accessTokenObject.accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    if (typeof verifyToken === "string") {
      throw new Error("Invalid token");
    }
    const userRole = verifyToken.role as UserRole;

    if (!data?.success) {
      throw new Error("Login failed");
    }

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(requestedPath);
      } else {
        redirect(getDefaultDashboardRoutes(userRole));
      }
    } else {
      redirect(getDefaultDashboardRoutes(userRole));
    }

    // const redirectPath = redirectTo
    //   ? redirectTo
    //   : getDefaultDashboardRoutes(userRole);
    // redirect(redirectPath);

    // return data;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      error: "Login User",
    };
  }
};
