"use client";

import { Segmented } from "antd";
import { SegmentedProps } from "antd/es/segmented";
import clsx from "clsx";

type AppSegmentedProps = {
  variant?: "default" | "large" | "small";
} & SegmentedProps;

export const AppSegmented = ({
  variant = "default",
  size: propSize,
  className,
  ...props
}: AppSegmentedProps) => {
  const getSize = () => {
    if (propSize) return propSize;
    if (variant === "large") return "large";
    if (variant === "small") return "small";
    return "middle";
  };

  return <Segmented size={getSize()} className={clsx(className)} {...props} />;
};
