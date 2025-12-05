"use client";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";

type AppLoadingProps = {
  size?: "small" | "default" | "large";
  fullScreen?: boolean;
  tip?: string;
  className?: string;
};

export const AppLoading = ({
  size = "large",
  fullScreen = false,
  tip = "Đang tải...",
  className,
}: AppLoadingProps) => {
  const spinnerSize = size === "large" ? 48 : size === "default" ? 32 : 16;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <Spin
          size={size}
          tip={tip}
          indicator={<LoadingOutlined style={{ fontSize: spinnerSize }} spin />}
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex min-h-[200px] items-center justify-center py-12",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <Spin
          size={size}
          indicator={<LoadingOutlined style={{ fontSize: spinnerSize }} spin />}
        />
        {tip && <span className="text-gray-600">{tip}</span>}
      </div>
    </div>
  );
};
