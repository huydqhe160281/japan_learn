"use client";

import { useEffect, useRef } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// Kiểm tra xem có phải môi trường browser không
const isBrowser = typeof window !== "undefined";

export type TourType = "multiple-choice" | "flashcard";

export interface TourGuideProps {
  tourType: TourType;
  enabled?: boolean;
  onComplete?: () => void;
}

export function TourGuide({
  tourType,
  enabled = true,
  onComplete,
}: TourGuideProps) {
  const driverObjRef = useRef<ReturnType<typeof driver> | null>(null);

  useEffect(() => {
    if (!enabled || !isBrowser) return;

    // Đợi DOM render xong
    const timer = setTimeout(() => {
      if (tourType === "multiple-choice") {
        driverObjRef.current = driver({
          showProgress: true,
          showButtons: ["next", "previous", "close"],
          onDestroyStarted: () => {
            if (onComplete) {
              onComplete();
            }
          },
          steps: [
            {
              element: "[data-tour='title']",
              popover: {
                title: "Chào mừng đến với Multiple Choice Quiz! 🎉",
                description:
                  "Đây là chế độ trắc nghiệm giúp bạn học bảng chữ cái tiếng Nhật. Hãy cùng khám phá các tính năng!",
                side: "bottom",
                align: "center",
              },
            },
            {
              element: "[data-tour='alphabet-selector']",
              popover: {
                title: "Chọn loại bảng chữ cái",
                description:
                  "Bạn có thể chuyển đổi giữa Hiragana (ひらがな) và Katakana (カタカナ) để luyện tập.",
                side: "bottom",
                align: "center",
              },
            },
            {
              element: "[data-tour='statistics']",
              popover: {
                title: "Theo dõi tiến độ",
                description:
                  "Xem số câu trả lời đúng và tổng số câu đã làm. Hãy cố gắng đạt tỷ lệ cao nhé!",
                side: "bottom",
                align: "center",
              },
            },
            {
              element: "[data-tour='question']",
              popover: {
                title: "Câu hỏi",
                description:
                  "Chữ cái tiếng Nhật sẽ được hiển thị ở đây. Nhiệm vụ của bạn là chọn cách đọc đúng (romaji).",
                side: "bottom",
                align: "center",
              },
            },
            {
              element: "[data-tour='options']",
              popover: {
                title: "Các lựa chọn",
                description:
                  "Chọn một trong 4 đáp án. Bạn có thể dùng phím 1-4 hoặc A-D để chọn nhanh!",
                side: "top",
                align: "start",
              },
            },
          ],
        });

        driverObjRef.current.drive();
      } else if (tourType === "flashcard") {
        driverObjRef.current = driver({
          showProgress: true,
          showButtons: ["next", "previous", "close"],
          onDestroyStarted: () => {
            if (onComplete) {
              onComplete();
            }
          },
          steps: [
            {
              element: "[data-tour='title']",
              popover: {
                title: "Chào mừng đến với Flashcard Quiz! 🎴",
                description:
                  "Đây là chế độ học bằng thẻ flashcard. Click vào thẻ để xem đáp án!",
                side: "bottom",
                align: "center",
              },
            },
            {
              element: "[data-tour='alphabet-selector']",
              popover: {
                title: "Chọn loại bảng chữ cái",
                description:
                  "Chuyển đổi giữa Hiragana và Katakana để luyện tập các bảng chữ cái khác nhau.",
                side: "bottom",
                align: "center",
              },
            },
            {
              element: "[data-tour='statistics']",
              popover: {
                title: "Thống kê học tập",
                description:
                  "Theo dõi tiến độ, số thẻ đã biết và số thẻ còn lại. Hãy cố gắng học hết tất cả!",
                side: "bottom",
                align: "center",
              },
            },
            {
              element: "[data-tour='flashcard']",
              popover: {
                title: "Thẻ Flashcard",
                description:
                  "Click vào thẻ để lật và xem đáp án. Mặt trước hiển thị chữ cái, mặt sau hiển thị cách đọc (romaji).",
                side: "left",
                align: "center",
              },
            },
            {
              element: "[data-tour='controls']",
              popover: {
                title: "Điều khiển",
                description:
                  "Sử dụng các nút để điều hướng, đánh dấu thẻ đã biết/chưa biết, hoặc xáo trộn lại thẻ.",
                side: "top",
                align: "center",
              },
            },
          ],
        });

        driverObjRef.current.drive();
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      if (driverObjRef.current) {
        driverObjRef.current.destroy();
      }
    };
  }, [tourType, enabled, onComplete]);

  return null;
}
