import { getCookies } from "@/services/auth/tokenHandler";
import PublicNavbar from "./PublicNavbar";

const NavbarWrapper = async () => {
  const accessToken = (await getCookies("accessToken")) || null;
  return <PublicNavbar accessToken={accessToken as string} />;
};

export default NavbarWrapper;
