import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import BottomNavbar from "@/components/bottomNavbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-[#202122]">
          <Navbar />
          <main className="flex-1 w-full px-4">
            <div className="mx-auto w-full max-w-6xl py-10">{children}</div>
          </main>
          <BottomNavbar />
        </div>
      </body>
    </html>
  );
}
