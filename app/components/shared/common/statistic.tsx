"use client";

import { Statistic } from "antd";
import { StatisticProps } from "antd/es/statistic";
import clsx from "clsx";

type AppStatisticProps = {
  variant?: "default" | "success" | "primary" | "danger";
} & StatisticProps;

export const AppStatistic = ({
  variant = "default",
  className,
  valueStyle,
  ...props
}: AppStatisticProps) => {
  const getValueStyle = () => {
    if (valueStyle) return valueStyle;

    const colors = {
      default: { color: "#000000" },
      success: { color: "#3f8600" },
      primary: { color: "#1890ff" },
      danger: { color: "#ff4d4f" },
    };

    return colors[variant];
  };

  return (
    <Statistic
      className={clsx(className)}
      styles={{
        content: {
          color: getValueStyle().color,
        },
      }}
      {...props}
    />
  );
};
