"use client";

import { useState, useEffect, useCallback } from "react";
import { Radio, Space, Row, Col, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import type { AlphabetType, JapaneseCharacter } from "../data/japaneseAlphabet";
import {
  hiragana,
  katakana,
  getRandomWrongAnswers,
  shuffleArray,
} from "../data/japaneseAlphabet";
import {
  AppCard,
  AppTitle,
  AppText,
  AppStatistic,
  AppSegmented,
  AppRadioGroup,
  AppLoading,
} from "./shared/common";

export default function MultipleChoiceQuiz() {
  const [alphabetType, setAlphabetType] = useState<AlphabetType>("hiragana");
  const [currentQuestion, setCurrentQuestion] =
    useState<JapaneseCharacter | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Khởi tạo câu hỏi đầu tiên khi thay đổi loại bảng chữ cái
  useEffect(() => {
    const loadQuestion = () => {
      setIsLoading(true);

      setTimeout(() => {
        const characters = alphabetType === "hiragana" ? hiragana : katakana;
        const randomIndex = Math.floor(Math.random() * characters.length);
        const question = characters[randomIndex];

        setCurrentQuestion(question);
        setSelectedAnswer("");
        setShowResult(false);

        const allRomaji = characters.map((char) => char.romaji);
        const wrongAnswers = getRandomWrongAnswers(
          question.romaji,
          allRomaji,
          3,
        );
        const allOptions = shuffleArray([question.romaji, ...wrongAnswers]);
        setOptions(allOptions);
        setIsLoading(false);
      }, 200);
    };

    const timer = setTimeout(loadQuestion, 0);
    return () => clearTimeout(timer);
  }, [alphabetType]);

  // Xử lý khi chọn đáp án - tự động check và chuyển câu
  const handleAnswerSelect = useCallback(
    (value: string) => {
      if (showResult || !currentQuestion) return;

      setSelectedAnswer(value);

      const correct = value === currentQuestion.romaji;
      setIsCorrect(correct);
      setShowResult(true);
      setScore((prev) => ({
        correct: correct ? prev.correct + 1 : prev.correct,
        total: prev.total + 1,
      }));

      if (correct) {
        message.success("Chính xác! 🎉");
      } else {
        message.error(`Sai rồi! Đáp án đúng là: ${currentQuestion.romaji}`);
      }
    },
    [showResult, currentQuestion],
  );

  // Tự động chuyển câu tiếp theo sau khi hiển thị kết quả
  useEffect(() => {
    if (!showResult) return;

    const timer = setTimeout(() => {
      const characters = alphabetType === "hiragana" ? hiragana : katakana;
      const randomIndex = Math.floor(Math.random() * characters.length);
      const question = characters[randomIndex];

      setCurrentQuestion(question);
      setSelectedAnswer("");
      setShowResult(false);

      const allRomaji = characters.map((char) => char.romaji);
      const wrongAnswers = getRandomWrongAnswers(question.romaji, allRomaji, 3);
      const allOptions = shuffleArray([question.romaji, ...wrongAnswers]);
      setOptions(allOptions);
    }, 2000); // 2 giây để người dùng xem kết quả

    return () => clearTimeout(timer);
  }, [showResult, alphabetType]);

  // Xử lý keyboard shortcuts (1-4, A-D)
  useEffect(() => {
    if (showResult || !currentQuestion || options.length === 0) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      let optionIndex: number | null = null;

      if (key >= "1" && key <= "4") {
        optionIndex = parseInt(key) - 1;
      } else if (key >= "a" && key <= "d") {
        optionIndex = key.charCodeAt(0) - "a".charCodeAt(0);
      }

      if (optionIndex !== null && optionIndex < options.length) {
        e.preventDefault();
        handleAnswerSelect(options[optionIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showResult, currentQuestion, options, handleAnswerSelect]);

  if (isLoading) {
    return (
      <AppCard variant="shadow">
        <AppLoading tip="Đang tải câu hỏi..." />
      </AppCard>
    );
  }

  return (
    <AppCard variant="shadow">
      <div className="mb-6 text-center">
        <AppTitle level={1} className="!mb-2" data-tour="title">
          Học Bảng Chữ Cái Tiếng Nhật
        </AppTitle>
      </div>

      {/* Chọn loại bảng chữ cái */}
      <div className="mb-6 flex justify-center" data-tour="alphabet-selector">
        <AppSegmented
          variant="large"
          options={[
            { label: "Hiragana (ひらがな)", value: "hiragana" },
            { label: "Katakana (カタカナ)", value: "katakana" },
          ]}
          value={alphabetType}
          onChange={(value) => {
            setAlphabetType(value as AlphabetType);
            setScore({ correct: 0, total: 0 });
          }}
        />
      </div>

      {/* Thống kê điểm số */}
      <Row gutter={16} className="mb-6" data-tour="statistics">
        <Col span={12}>
          <AppCard>
            <AppStatistic
              variant="success"
              title="Đúng"
              value={score.correct}
              prefix={<CheckCircleOutlined className="text-green-500" />}
            />
          </AppCard>
        </Col>
        <Col span={12}>
          <AppCard>
            <AppStatistic
              variant="primary"
              title="Tổng số câu"
              value={score.total}
            />
          </AppCard>
        </Col>
      </Row>

      {/* Câu hỏi */}
      {currentQuestion && (
        <AppCard className="mb-6">
          <div className="mb-6 text-center" data-tour="question">
            <div className="mb-4 text-8xl font-bold text-indigo-600">
              {currentQuestion.character}
            </div>
            <AppText size="xl" className="text-gray-600">
              Chữ cái này đọc là gì?
            </AppText>
          </div>

          {/* Các lựa chọn */}
          <div data-tour="options">
            <AppRadioGroup
              value={selectedAnswer}
              onChange={(e) => handleAnswerSelect(e.target.value)}
              disabled={showResult}
            >
              <Space orientation="vertical" size="middle" className="w-full">
                {options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectAnswer = option === currentQuestion.romaji;
                  const optionLabel = String.fromCharCode(65 + index);
                  let buttonClass =
                    "w-full text-left transition-all duration-200";

                  if (!showResult) {
                    buttonClass +=
                      " hover:bg-blue-50 hover:border-blue-400 hover:shadow-md";
                  }

                  if (showResult) {
                    if (isCorrectAnswer) {
                      buttonClass += " bg-green-100 border-green-500";
                    } else if (isSelected && !isCorrectAnswer) {
                      buttonClass += " bg-red-100 border-red-500";
                    }
                  }

                  return (
                    <Radio.Button
                      key={index}
                      value={option}
                      className={buttonClass}
                      style={{
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      <Space>
                        <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                          {optionLabel}
                        </span>
                        {showResult && isCorrectAnswer && (
                          <CheckCircleOutlined className="text-xl text-green-500" />
                        )}
                        {showResult && isSelected && !isCorrectAnswer && (
                          <CloseCircleOutlined className="text-xl text-red-500" />
                        )}
                        <span>{option}</span>
                      </Space>
                    </Radio.Button>
                  );
                })}
              </Space>
            </AppRadioGroup>
          </div>

          {/* Hiển thị kết quả */}
          {showResult && (
            <div className="mt-6 text-center">
              {isCorrect ? (
                <AppText size="2xl" variant="success" className="font-bold">
                  ✓ Chính xác!
                </AppText>
              ) : (
                <AppText size="2xl" variant="danger" className="font-bold">
                  ✗ Sai rồi! Đáp án đúng là:{" "}
                  <strong>{currentQuestion.romaji}</strong>
                </AppText>
              )}
              <AppText size="sm" variant="secondary" className="mt-2 block">
                Đang chuyển sang câu tiếp theo...
              </AppText>
            </div>
          )}
        </AppCard>
      )}
    </AppCard>
  );
}
