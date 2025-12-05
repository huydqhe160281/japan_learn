import JapaneseQuiz from "./components/JapaneseQuiz";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Bảng Chữ Cái Tiếng Nhật",
  description:
    "Học bảng chữ cái tiếng Nhật Hiragana và Katakana qua quiz tương tác. Ứng dụng miễn phí giúp bạn nắm vững 46 ký tự Hiragana và 46 ký tự Katakana.",
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Học Bảng Chữ Cái Tiếng Nhật",
    description:
      "Ứng dụng học bảng chữ cái tiếng Nhật miễn phí với quiz multiple choice. Học Hiragana và Katakana một cách hiệu quả.",
    url: "https://japan-learn.vercel.app",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
    featureList: [
      "Quiz Hiragana",
      "Quiz Katakana",
      "Thống kê điểm số",
      "Giao diện đẹp mắt",
      "Hoàn toàn miễn phí",
    ],
    educationalUse: "learning",
    learningResourceType: "Quiz",
    teaches: ["Japanese Alphabet", "Hiragana", "Katakana"],
    inLanguage: "vi",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <JapaneseQuiz />
    </>
  );
}
