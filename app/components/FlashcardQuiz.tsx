"use client";

import { useState, useEffect } from "react";
import { Row, Col, message } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { AlphabetType, JapaneseCharacter } from "../data/japaneseAlphabet";
import { hiragana, katakana, shuffleArray } from "../data/japaneseAlphabet";
import {
  AppCard,
  AppTitle,
  AppText,
  AppStatistic,
  AppSegmented,
  AppButton,
  AppLoading,
} from "./shared/common";

export default function FlashcardQuiz() {
  const [alphabetType, setAlphabetType] = useState<AlphabetType>("hiragana");
  const [cards, setCards] = useState<JapaneseCharacter[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Khởi tạo cards khi thay đổi loại bảng chữ cái
  useEffect(() => {
    const loadCards = () => {
      setIsLoading(true);
      setIsFlipped(false);

      setTimeout(() => {
        const characters = alphabetType === "hiragana" ? hiragana : katakana;
        const shuffled = shuffleArray([...characters]);
        setCards(shuffled);
        setCurrentIndex(0);
        setKnownCards(new Set());
        setIsLoading(false);
      }, 200);
    };

    loadCards();
  }, [alphabetType]);

  const currentCard = cards[currentIndex];

  // Flip card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Chuyển sang card tiếp theo
  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      message.info("Đã hết các thẻ! Bấm Shuffle để xáo trộn lại.");
    }
  };

  // Chuyển về card trước
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  // Đánh dấu đã biết
  const handleKnown = () => {
    if (currentCard) {
      setKnownCards((prev) => new Set(prev).add(currentCard.character));
      message.success("Đã đánh dấu là đã biết!");
      setTimeout(() => {
        handleNext();
      }, 500);
    }
  };

  // Đánh dấu chưa biết
  const handleUnknown = () => {
    if (currentCard) {
      setKnownCards((prev) => {
        const newSet = new Set(prev);
        newSet.delete(currentCard.character);
        return newSet;
      });
      message.info("Đã đánh dấu là chưa biết. Hãy tiếp tục luyện tập!");
    }
  };

  // Shuffle lại cards
  const handleShuffle = () => {
    const shuffled = shuffleArray([...cards]);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    message.success("Đã xáo trộn lại các thẻ!");
  };

  // Xử lý keyboard shortcuts
  useEffect(() => {
    if (isLoading || !currentCard) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // Lật thẻ: Space, F, ArrowUp, ArrowDown
      if (
        key === " " ||
        key === "f" ||
        key === "arrowup" ||
        key === "arrowdown"
      ) {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
      // Tiến lên: ArrowRight, N
      else if (key === "arrowright" || key === "n") {
        e.preventDefault();
        if (currentIndex < cards.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setIsFlipped(false);
        } else {
          message.info("Đã hết các thẻ! Bấm Shuffle để xáo trộn lại.");
        }
      }
      // Quay lại: ArrowLeft, P
      else if (key === "arrowleft" || key === "p") {
        e.preventDefault();
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setIsFlipped(false);
        }
      }
      // Đánh dấu đã biết: K
      else if (key === "k") {
        e.preventDefault();
        if (currentCard) {
          setKnownCards((prev) => new Set(prev).add(currentCard.character));
          message.success("Đã đánh dấu là đã biết!");
          setTimeout(() => {
            if (currentIndex < cards.length - 1) {
              setCurrentIndex((prev) => prev + 1);
              setIsFlipped(false);
            }
          }, 500);
        }
      } else if (key === "u") {
        e.preventDefault();
        if (currentCard) {
          setKnownCards((prev) => {
            const newSet = new Set(prev);
            newSet.delete(currentCard.character);
            return newSet;
          });
          message.info("Đã đánh dấu là chưa biết. Hãy tiếp tục luyện tập!");
        }
      } else if (key === "s") {
        e.preventDefault();
        const shuffled = shuffleArray([...cards]);
        setCards(shuffled);
        setCurrentIndex(0);
        setIsFlipped(false);
        message.success("Đã xáo trộn lại các thẻ!");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isLoading, currentCard, currentIndex, cards]);

  if (isLoading) {
    return (
      <AppCard variant="shadow">
        <AppLoading tip="Đang tải thẻ..." />
      </AppCard>
    );
  }

  const progress = ((currentIndex + 1) / cards.length) * 100;
  const knownCount = knownCards.size;

  return (
    <AppCard variant="shadow">
      <div className="mb-6 text-center">
        <AppTitle level={1} className="!mb-2">
          Flashcard Học Bảng Chữ Cái
        </AppTitle>
        <AppText variant="secondary" size="lg">
          Click vào thẻ để xem đáp án
        </AppText>
        <AppText size="sm" variant="secondary" className="mt-2 block">
          💡 Phím tắt: <strong>Space/F/↑/↓</strong> - Lật thẻ,{" "}
          <strong>→/N</strong> - Tiếp theo, <strong>←/P</strong> - Trước,{" "}
          <strong>K</strong> - Đã biết, <strong>U</strong> - Chưa biết,{" "}
          <strong>S</strong> - Shuffle
        </AppText>
      </div>

      {/* Chọn loại bảng chữ cái */}
      <div className="mb-6 flex justify-center">
        <AppSegmented
          variant="large"
          options={[
            { label: "Hiragana (ひらがな)", value: "hiragana" },
            { label: "Katakana (カタカナ)", value: "katakana" },
          ]}
          value={alphabetType}
          onChange={(value) => {
            setAlphabetType(value as AlphabetType);
          }}
        />
      </div>

      {/* Thống kê */}
      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <AppCard>
            <AppStatistic
              variant="primary"
              title="Tiến độ"
              value={`${currentIndex + 1}/${cards.length}`}
            />
          </AppCard>
        </Col>
        <Col span={8}>
          <AppCard>
            <AppStatistic
              variant="success"
              title="Đã biết"
              value={knownCount}
              prefix={<CheckCircleOutlined className="text-green-500" />}
            />
          </AppCard>
        </Col>
        <Col span={8}>
          <AppCard>
            <AppStatistic
              variant="default"
              title="Còn lại"
              value={cards.length - knownCount}
            />
          </AppCard>
        </Col>
      </Row>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      {currentCard && (
        <div className="mb-6">
          <div
            className="relative mx-auto h-64 w-full cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={handleFlip}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleFlip();
              }
            }}
          >
            <div
              className="relative h-full w-full transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Mặt trước - Hiển thị chữ cái */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <AppCard className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 text-9xl font-bold text-indigo-600">
                      {currentCard.character}
                    </div>
                    <AppText size="lg" variant="secondary">
                      Click để xem đáp án
                    </AppText>
                  </div>
                </AppCard>
              </div>

              {/* Mặt sau - Hiển thị romaji */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <AppCard className="flex h-full items-center justify-center bg-indigo-50">
                  <div className="text-center">
                    <div className="mb-4 text-7xl font-bold text-indigo-700">
                      {currentCard.romaji}
                    </div>
                    <AppText size="xl" variant="secondary">
                      {currentCard.character}
                    </AppText>
                    {knownCards.has(currentCard.character) && (
                      <div className="mt-4">
                        <CheckCircleOutlined className="text-3xl text-green-500" />
                        <AppText
                          size="sm"
                          variant="success"
                          className="mt-2 block"
                        >
                          Đã đánh dấu là đã biết
                        </AppText>
                      </div>
                    )}
                  </div>
                </AppCard>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4">
        <AppButton
          colorType="primary"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          ← Trước
        </AppButton>
        <AppButton colorType="primary" onClick={handleFlip}>
          {isFlipped ? "Ẩn" : "Lật"} thẻ
        </AppButton>
        <AppButton
          colorType="primary"
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
        >
          Tiếp theo →
        </AppButton>
        <AppButton colorType="success" onClick={handleKnown}>
          <CheckCircleOutlined /> Đã biết
        </AppButton>
        <AppButton colorType="danger" onClick={handleUnknown}>
          <CloseCircleOutlined /> Chưa biết
        </AppButton>
        <AppButton onClick={handleShuffle}>
          <ReloadOutlined /> Shuffle
        </AppButton>
      </div>
    </AppCard>
  );
}
