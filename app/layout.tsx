import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const Mona_Sans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "PreWise Next App",
  description: "An Ai powered platform",
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
