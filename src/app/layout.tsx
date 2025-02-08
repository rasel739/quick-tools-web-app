import type { Metadata } from "next";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quick tools",
  description: "Quick tools is solve this some of the problems",
  icons: {
    icon: [
      //! Android Icons
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/android-chrome-512x512.png",
      },

      //! Apple Icons
      {
        rel: "apple-touch-icon",
        type: "image/ico",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
