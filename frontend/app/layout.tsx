import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: "Pokédex App",
  description: "Involve Asia Pokédex Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
