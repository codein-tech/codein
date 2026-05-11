import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://codein-umb.vercel.app"),

  title: {
    default: "CodeIn — Komunitas IT Universitas Muhammadiyah Bengkulu",
    template: "%s | CodeIn",
  },

  description:
    "Komunitas belajar, berbagi, dan berkolaborasi di bidang teknologi dan programming untuk mahasiswa Universitas Muhammadiyah Bengkulu.",

  keywords: ["CodeIn", "komunitas IT", "programming", "UMB", "Bengkulu"],

  openGraph: {
    title: "CodeIn",
    description: "Komunitas IT Universitas Muhammadiyah Bengkulu",
    url: "https://codein-umb.vercel.app",
    siteName: "CodeIn",
    type: "website",

    images: [
      {
        url: "/images/deffault.jpeg",
        width: 1200,
        height: 630,
        alt: "CodeIn",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CodeIn",
    description: "Komunitas IT Universitas Muhammadiyah Bengkulu",
    images: ["/images/deffault.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
