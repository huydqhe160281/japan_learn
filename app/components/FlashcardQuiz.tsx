"use client";

import { AppCard, AppTitle, AppText } from "./shared/common";

export default function FlashcardQuiz() {
  return (
    <AppCard variant="shadow">
      <div className="py-12 text-center">
        <AppTitle level={2} className="mb-4">
          Flashcard Mode
        </AppTitle>
        <AppText variant="secondary" size="lg">
          Tính năng đang được phát triển...
        </AppText>
      </div>
    </AppCard>
  );
}
