import Hero from "@/components/Hero";
import About from "@/components/About";
import Arkshism from "@/components/Arkshism";
import MajorInvolvements from "@/components/MajorInvolvements";
import FeaturedProducts from "@/components/FeaturedProducts";
import Achievements from "@/components/Acheievements";
import Companies from "@/components/Companies";
import Brands from "@/components/Brands";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arksh Group | Leading Business Conglomerate in Nepal",
  description:
    "Arksh Group is a diversified business conglomerate involved in automobiles, food & beverages, hospitality, wellness, and multiple global brands.",
};

export default function Home() {
  // console.log(supabase);
  return (
    <>
      <Hero />
      <About />
      <Arkshism />
      <MajorInvolvements />
      <FeaturedProducts />
      <Achievements />
      <Companies />
      <Brands />
    </>
  );
}
