import type { Metadata } from "next";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quick tools",
  description: "Quick tools is solve this some of the problems",
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
