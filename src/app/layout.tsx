import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
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
    type: "website",
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
