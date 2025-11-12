import { getCookies } from "@/services/auth/tokenHandler";
import PublicNavbar from "./PublicNavbar";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { IAuthUser } from "@/types/user.interface";

const NavbarWrapper = async () => {
  const accessToken = (await getCookies("accessToken")) || null;
  const authData = (await getUserInfo()) as IAuthUser;
  return (
    <PublicNavbar authData={authData} accessToken={accessToken as string} />
  );
};

export default NavbarWrapper;
