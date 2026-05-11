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
    title,
    description,

    openGraph: {
      title,
      description,

      url:
        `https://codein-umb.vercel.app/articles/${id}`,

      siteName: "CodeIn",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],

      locale: "id_ID",

      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function Layout({
  children,
}: Props) {
  return children;
}
