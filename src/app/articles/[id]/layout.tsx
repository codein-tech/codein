import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

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
    .single();

  if (!article) {
    ({ data: article } = await supabase
      .from("articles")
      .select("title, content, thumbnail, cover_image, slug")
      .eq("id", id)
      .single());
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
    title,
    description,

    openGraph: {
      title,
      description,
      type: "article",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Layout({
  children,
}: Props) {

  return children;
}
