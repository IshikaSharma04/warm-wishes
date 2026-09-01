import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppBubble } from "@/components/ui/WhatsAppBubble";
import { PwaRegister } from "@/components/pwa/PwaRegister";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  themeColor: "#141210",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Warm Wishes | Luxury Handcrafted Gifts",
  description: "Thoughtfully crafted candles, chocolates and handmade soaps designed to create memorable gifting experiences.",
  openGraph: {
    title: "Warm Wishes | Luxury Handcrafted Gifts",
    description: "Thoughtfully crafted candles, chocolates and handmade soaps designed to create memorable gifting experiences.",
    siteName: "Warm Wishes",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: "Warm Wishes Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Warm Wishes | Luxury Handcrafted Gifts",
    description: "Thoughtfully crafted candles, chocolates and handmade soaps designed to create memorable gifting experiences.",
    images: ["/images/logo.png"],
  },
  appleWebApp: {
    capable: true,
    title: "Warm Wishes",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${cormorant.variable} ${poppins.variable} font-sans antialiased`}>
        <PwaRegister />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppBubble />
      </body>
    </html>
  );
}
