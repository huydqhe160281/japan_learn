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
  const spinner = (
    <Spin
      size={size}
      tip={tip}
      indicator={
        <LoadingOutlined
          style={{ fontSize: size === "large" ? 48 : 24 }}
          spin
        />
      }
      className={clsx(className)}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex min-h-[200px] items-center justify-center py-12">
      {spinner}
    </div>
  );
};
