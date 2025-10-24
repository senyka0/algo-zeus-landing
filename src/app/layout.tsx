import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlgoZeus",
  icons: {
    icon: "favicon.ico",
  },
  description:
    "Subscriptions to quantitative trading portfolios that are designed to outperform crypto markets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
