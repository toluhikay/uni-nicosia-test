import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNIC GPT",
  description: "Making the world a better place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-full h-[100vh]`}>{children}</body>
    </html>
  );
}
