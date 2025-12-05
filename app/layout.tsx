import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "antd/dist/reset.css";
import "./globals.css";
import { Navbar } from "./components/shared/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Học Bảng Chữ Cái Tiếng Nhật",
  description: "Ứng dụng học bảng chữ cái tiếng Nhật với quiz multiple choice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="mx-auto max-w-4xl px-4 py-8">
            <Navbar />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
