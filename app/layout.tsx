import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "antd/dist/reset.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Học Bảng Chữ Cái Tiếng Nhật - Quiz Hiragana & Katakana",
    template: "%s | Học Tiếng Nhật",
  },
  description:
    "Ứng dụng học bảng chữ cái tiếng Nhật miễn phí với quiz multiple choice. Học Hiragana và Katakana một cách hiệu quả thông qua các câu hỏi trắc nghiệm tương tác. Phù hợp cho người mới bắt đầu học tiếng Nhật.",
  keywords: [
    "học tiếng nhật",
    "bảng chữ cái tiếng nhật",
    "hiragana",
    "katakana",
    "quiz tiếng nhật",
    "học hiragana",
    "học katakana",
    "tiếng nhật cơ bản",
    "japanese alphabet",
    "japanese quiz",
    "học chữ nhật",
    "bảng chữ cái nhật",
  ],
  authors: [{ name: "huydq" }],
  creator: "huydq",
  publisher: "huydq",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://japan-learn.vercel.app"), // Cập nhật URL thực tế của bạn
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://japan-learn.vercel.app", // Cập nhật URL thực tế của bạn
    title: "Học Bảng Chữ Cái Tiếng Nhật - Quiz Hiragana & Katakana",
    description:
      "Ứng dụng học bảng chữ cái tiếng Nhật miễn phí với quiz multiple choice. Học Hiragana và Katakana một cách hiệu quả thông qua các câu hỏi trắc nghiệm tương tác.",
    siteName: "Học Bảng Chữ Cái Tiếng Nhật",
    images: [
      {
        url: "/og-image.png", // Bạn có thể thêm ảnh OG sau
        width: 1200,
        height: 630,
        alt: "Học Bảng Chữ Cái Tiếng Nhật",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Học Bảng Chữ Cái Tiếng Nhật - Quiz Hiragana & Katakana",
    description:
      "Ứng dụng học bảng chữ cái tiếng Nhật miễn phí với quiz multiple choice. Học Hiragana và Katakana một cách hiệu quả.",
    images: ["/og-image.png"], // Bạn có thể thêm ảnh Twitter sau
    creator: "@japanlearn", // Cập nhật Twitter handle của bạn nếu có
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Thêm verification codes nếu có
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "education",
  classification: "Educational",
  other: {
    "theme-color": "#4f46e5",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Học Tiếng Nhật",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
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
        {children}
      </body>
    </html>
  );
}
