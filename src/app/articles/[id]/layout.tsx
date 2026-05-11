import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface Props {
  children: React.ReactNode;

  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const { id } = await params;

  const supabase = await createClient();

  let { data: article } = await supabase
    .from("articles")
    .select("title, content, thumbnail, cover_image, slug")
    .eq("slug", id)
    .maybeSingle();

  if (!article) {
    ({ data: article } = await supabase
      .from("articles")
      .select("title, content, thumbnail, cover_image, slug")
      .eq("id", id)
      .maybeSingle());
  }

  if (!article) {
    return {
      title: "Artikel",
      description: "Artikel CodeIn",
    };
  }

  const title = article.title;

  const description =
    article.content
      ?.replace(/<[^>]+>/g, "")
      .slice(0, 160) || "Artikel CodeIn";

  const image =
    article.cover_image ||
    article.thumbnail ||
    "https://codein-umb.vercel.app/og/default.jpg";


  return {
  title: "TEST JUDUL ARTIKEL",
};
}

export default function Layout({
  children,
}: Props) {
  return children;
}
