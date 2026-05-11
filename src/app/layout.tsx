import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://codein-umb.vercel.app"),

  title: {
    default: "CodeIn",
    template: "%s | CodeIn",
  },

  description:
    "Komunitas belajar, berbagi, dan berkolaborasi di bidang teknologi dan programming untuk mahasiswa Universitas Muhammadiyah Bengkulu.",
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
