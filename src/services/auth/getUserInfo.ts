import { IAuthUser } from "@/types/user.interface";
import { getCookies } from "./tokenHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserInfo = async (): Promise<IAuthUser | null> => {
  const accessToken = await getCookies("accessToken");
  if (!accessToken) {
    return null;
  }
  const decodedToken = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as JwtPayload;
  if (!decodedToken) {
    return null;
  }

  const userInfo = {
    id: decodedToken.id,
    email: decodedToken.email,
    role: decodedToken.role,
  };

  return userInfo;
};
