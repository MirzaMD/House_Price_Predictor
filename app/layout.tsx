import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bangalore House Prices",
  description: "Gives the approximate value of a House in Bangalore",
   icons: {
    icon: "/images/favicon.avif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
