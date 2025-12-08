"use client";

import { useState } from "react";
import { Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import MultipleChoiceQuiz from "../components/MultipleChoiceQuiz";
import { TourGuide, type TourGuideProps } from "../components/shared/TourGuide";

export default function MultipleChoicePage() {
  const [showTour, setShowTour] = useState(false);

  const handleStartTour = () => {
    setShowTour(true);
  };

  const handleTourComplete = () => {
    setShowTour(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4 flex justify-end">
        <Button
          type="default"
          icon={<QuestionCircleOutlined />}
          onClick={handleStartTour}
        >
          Xem hướng dẫn
        </Button>
      </div>
      {showTour && (
        <TourGuide
          tourType="multiple-choice"
          enabled={showTour}
          onComplete={handleTourComplete}
        />
      )}
      <MultipleChoiceQuiz />
    </div>
  );
}
