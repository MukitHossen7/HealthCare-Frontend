"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const setCookies = async (
  key: string,
  value: string,
  options: Partial<ResponseCookie>
) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value, options);
};

export const getCookies = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key);
};

export const deleteCookies = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};
