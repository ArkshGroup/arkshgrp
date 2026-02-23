import BlogDetails from "@/components/BlogDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Details | Arksh Group",
  description:
    "Read the full blog post with insights, tips, and updates from Arksh Group covering business and innovation.",
};

export default function BlogSet() {
  return <BlogDetails />;
}
