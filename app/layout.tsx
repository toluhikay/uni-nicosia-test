import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
      <body className={`w-full h-[100vh]`}>
        <div className="w-full h-full">{children}</div>
        <div id="portals"></div>
        <Toaster
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
              marginTop: "100px",
              zIndex: 9999999999,
            },

            // Default options for specific types
            success: {
              duration: 5000,
            },
          }}
        />
      </body>
    </html>
  );
}
