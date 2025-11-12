"use server";

import { redirect } from "next/navigation";
import { deleteCookies } from "./tokenHandler";

export const logoutUser = async () => {
  await deleteCookies("accessToken");
  await deleteCookies("refreshToken");
  redirect("/");
};
