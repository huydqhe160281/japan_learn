"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Radio,
  Space,
  Typography,
  Segmented,
  Statistic,
  Row,
  Col,
  message,
} from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import type { AlphabetType, JapaneseCharacter } from "../data/japaneseAlphabet";
import {
  hiragana,
  katakana,
  getRandomWrongAnswers,
  shuffleArray,
} from "../data/japaneseAlphabet";

const { Title, Text } = Typography;

export default function JapaneseQuiz() {
  const [alphabetType, setAlphabetType] = useState<AlphabetType>("hiragana");
  const [currentQuestion, setCurrentQuestion] =
    useState<JapaneseCharacter | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Lấy danh sách ký tự theo loại
  const getCharacters = (): JapaneseCharacter[] => {
    return alphabetType === "hiragana" ? hiragana : katakana;
  };

  // Tạo câu hỏi mới
  const generateQuestion = () => {
    const characters = getCharacters();
    const randomIndex = Math.floor(Math.random() * characters.length);
    const question = characters[randomIndex];

    setCurrentQuestion(question);
    setSelectedAnswer("");
    setShowResult(false);

    // Tạo các lựa chọn
    const allRomaji = characters.map((char) => char.romaji);
    const wrongAnswers = getRandomWrongAnswers(question.romaji, allRomaji, 3);
    const allOptions = shuffleArray([question.romaji, ...wrongAnswers]);
    setOptions(allOptions);
  };

  // Khởi tạo câu hỏi đầu tiên khi thay đổi loại bảng chữ cái
  useEffect(() => {
    // Sử dụng setTimeout để tránh warning về setState trong effect
    const timer = setTimeout(() => {
      const characters = alphabetType === "hiragana" ? hiragana : katakana;
      const randomIndex = Math.floor(Math.random() * characters.length);
      const question = characters[randomIndex];

      setCurrentQuestion(question);
      setSelectedAnswer("");
      setShowResult(false);

      // Tạo các lựa chọn
      const allRomaji = characters.map((char) => char.romaji);
      const wrongAnswers = getRandomWrongAnswers(question.romaji, allRomaji, 3);
      const allOptions = shuffleArray([question.romaji, ...wrongAnswers]);
      setOptions(allOptions);
    }, 0);

    return () => clearTimeout(timer);
  }, [alphabetType]);

  // Xử lý khi chọn đáp án
  const handleAnswerSelect = (value: string) => {
    if (showResult) return;
    setSelectedAnswer(value);
  };

  // Xử lý khi submit đáp án
  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return;

    const correct = selectedAnswer === currentQuestion.romaji;
    setIsCorrect(correct);
    setShowResult(true);
    setScore({
      correct: correct ? score.correct + 1 : score.correct,
      total: score.total + 1,
    });

    if (correct) {
      message.success("Chính xác! 🎉");
    } else {
      message.error(`Sai rồi! Đáp án đúng là: ${currentQuestion.romaji}`);
    }
  };

  // Xử lý câu hỏi tiếp theo
  const handleNext = () => {
    generateQuestion();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <div className="text-center mb-6">
            <Title level={1} className="!mb-2">
              Học Bảng Chữ Cái Tiếng Nhật
            </Title>
            <Text type="secondary" className="text-lg">
              Chọn đáp án đúng cho chữ cái được hiển thị
            </Text>
          </div>

          {/* Chọn loại bảng chữ cái */}
          <div className="mb-6 flex justify-center">
            <Segmented
              size="large"
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
          <Row gutter={16} className="mb-6">
            <Col span={12}>
              <Card>
                <Statistic
                  title="Đúng"
                  value={score.correct}
                  prefix={<CheckCircleOutlined className="text-green-500" />}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Tổng số câu"
                  value={score.total}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Câu hỏi */}
          {currentQuestion && (
            <Card className="mb-6">
              <div className="text-center mb-6">
                <div className="text-8xl font-bold mb-4 text-indigo-600">
                  {currentQuestion.character}
                </div>
                <Text className="text-xl text-gray-600">
                  Chữ cái này đọc là gì?
                </Text>
              </div>

              {/* Các lựa chọn */}
              <Radio.Group
                value={selectedAnswer}
                onChange={(e) => handleAnswerSelect(e.target.value)}
                className="w-full"
                disabled={showResult}
              >
                <Space direction="vertical" size="middle" className="w-full">
                  {options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrectAnswer = option === currentQuestion.romaji;
                    let buttonClass = "w-full text-left";

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
                          {showResult && isCorrectAnswer && (
                            <CheckCircleOutlined className="text-green-500 text-xl" />
                          )}
                          {showResult && isSelected && !isCorrectAnswer && (
                            <CloseCircleOutlined className="text-red-500 text-xl" />
                          )}
                          <span>{option}</span>
                        </Space>
                      </Radio.Button>
                    );
                  })}
                </Space>
              </Radio.Group>

              {/* Nút Submit/Next */}
              <div className="mt-6 flex justify-center">
                {!showResult ? (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    className="px-8 h-12 text-lg"
                  >
                    Kiểm tra
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleNext}
                    className="px-8 h-12 text-lg bg-green-500 hover:bg-green-600"
                  >
                    Câu tiếp theo
                  </Button>
                )}
              </div>

              {/* Hiển thị kết quả */}
              {showResult && (
                <div className="mt-4 text-center">
                  {isCorrect ? (
                    <Text className="text-2xl text-green-600 font-bold">
                      ✓ Chính xác!
                    </Text>
                  ) : (
                    <Text className="text-2xl text-red-600 font-bold">
                      ✗ Sai rồi! Đáp án đúng là:{" "}
                      <strong>{currentQuestion.romaji}</strong>
                    </Text>
                  )}
                </div>
              )}
            </Card>
          )}
        </Card>
      </div>
    </div>
  );
}
