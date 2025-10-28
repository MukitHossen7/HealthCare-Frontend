import { HeroSection } from "@/components/modules/Home/HeroSection";
import Specialties from "@/components/modules/Home/Specialties";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Specialties />
      <TopRatedDoctors />
      <Steps />
      <Testimonials />
    </>
  );
}
