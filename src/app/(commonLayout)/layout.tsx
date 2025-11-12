import NavbarWrapper from "@/components/shared/NavbarWrapper";
import PublicFooter from "@/components/shared/PublicFooter";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarWrapper />
      {children}
      <PublicFooter />
    </>
  );
};

export default CommonLayout;
