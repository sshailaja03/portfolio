import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/global/SmoothScroll";
import { CustomCursor } from "@/components/global/CustomCursor";
import { CursorTrail } from "@/components/global/CursorTrail";
import { Navigation } from "@/components/global/Navigation";
import { DynamicBackground } from "@/components/global/DynamicBackground";
import { ThemeProvider } from "@/components/global/ThemeProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shailaja Singh | UI/UX Designer & Engineer",
  description: "Portfolio of Shailaja Singh, a UI/UX designer and problem solver crafting clean, intuitive, visually rich digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-secondary selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DynamicBackground />
          <CursorTrail />
          <CustomCursor />
          <Navigation />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
