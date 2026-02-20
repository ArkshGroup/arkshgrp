import GalleryAlbum from "@/components/GalleryAlbum";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Arksh Group",
  description:
    "Explore the photo gallery of Arksh Group, featuring events, projects, and moments that showcase our work and achievements.",
};

export default function GallerySet() {
  return <GalleryAlbum />;
}
