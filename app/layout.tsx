import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GeScanner - Advanced Online QR Scanner & AI Reader",
  description: "Scan QR codes instantly from your camera or image files. GeScanner is a secure, no-install online tool with 100% privacy and lightning-fast results.",
  keywords: ["Online QR Scanner", "Scan QR from Image", "No-install QR Reader", "Free QR Scanner", "Secure QR Reader"],
  authors: [{ name: "GeScanner Team" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/ge.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
