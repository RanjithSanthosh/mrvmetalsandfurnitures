
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; 
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "MRV Group of Technologies | Premium Furnitures & Steels",
  description: "Explore top-quality industrial furnitures, steel products, and heavy-duty equipment at MRV Group of Technologies. Precision engineered for modern durability.",
  keywords: ["MRV Group", "Furnitures", "Steels", "Industrial Furniture", "Office Furniture", "Steel Rack", "Heavy Duty", "Storage Solutions"],
  authors: [{ name: "MRV Group of Technologies" }],
  openGraph: {
    title: "MRV Group of Technologies",
    description: "Premium industrial solutions engineered for modern living.",
    url: "https://mrvmetalsandfurnitures.in",
    siteName: "MRV Group",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MRV Group Showcase",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MRV Group of Technologies",
    description: "Premium Metals, Steel Products & More",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-50 text-slate-900`}
      >
        <main className="relative min-h-screen flex flex-col">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
