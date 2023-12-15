import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "zerosum",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full w-full">
      <body className="w-full h-full">{children}</body>
    </html>
  );
}
