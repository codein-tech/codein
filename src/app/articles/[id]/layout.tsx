import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

interface Props {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const supabase = await createClient();

  const { data } = await supabase
    .from("articles")
    .select("title, content, thumbnail, slug")
    .eq("slug", params.id)
    .single();

  const title = data?.title || "Artikel";

  const description =
    data?.content
      ?.replace(/<[^>]+>/g, "")
      .slice(0, 160) ||
    "Artikel CodeIn";

  const image =
    data?.thumbnail ||
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

export default function Layout({
  children,
}: Props) {
  return children;
}
