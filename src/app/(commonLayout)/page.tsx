import { HeroSection } from "@/components/modules/Home/HeroSection";
import Specialties from "@/components/modules/Home/Specialties";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        {/* Page Title */}
        <title>AI- Powered HealthCare - Find Your Perfect Doctor</title>
        {/* Meta Description */}
        <meta
          name="description"
          content="Explore Health Care for expert consultations, health plans, medicine, diagnostics, and support from trusted NGOs. Your health is our priority."
        />

        {/* Keywords for SEO */}
        <meta
          name="keywords"
          content="healthcare, medical consultation, health plans, medicine online, diagnostics, NGOs support, health solutions"
        />
        {/* Viewport for responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroSection />
        <Specialties />
        <TopRatedDoctors />
        <Steps />
        <Testimonials />
      </main>
    </>
  );
}
