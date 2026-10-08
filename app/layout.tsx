import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeaLayer from "@/components/SeaLayer";
import Enhancers from "@/components/Enhancers";
import "./globals.css";

export const metadata: Metadata = {
  title: "OceanCrest AI",
  description: "OceanCrest AI is half transformation partner, half AI educator.",
  // Working draft beside the live site: keep it out of search until the team switches over.
  robots: { index: false, follow: false },
  icons: { icon: { url: "/assets/img/logos/oceancrest-ai-mark-primary-rgb-fullcolor.svg", type: "image/svg+xml" } }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;500;600&family=Geist:wght@400;500&family=Geist+Mono:wght@400;500&display=swap" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <SeaLayer />
        <Enhancers />
      </body>
    </html>
  );
}
