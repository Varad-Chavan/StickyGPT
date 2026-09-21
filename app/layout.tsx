import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The White Flower",
  description: "A scrolling illustrated tale."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
