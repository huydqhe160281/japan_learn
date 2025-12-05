"use client";

import { Typography } from "antd";
import type { TitleProps } from "antd/es/typography/Title";
import type { TextProps } from "antd/es/typography/Text";
import clsx from "clsx";

const { Title: AntTitle, Text: AntText } = Typography;

type AppTitleProps = {
  level?: 1 | 2 | 3 | 4 | 5;
} & TitleProps;

export const AppTitle = ({
  level = 1,
  className,
  children,
  ...props
}: AppTitleProps) => {
  return (
    <AntTitle level={level} className={clsx(className)} {...props}>
      {children}
    </AntTitle>
  );
};

type AppTextProps = {
  variant?: "default" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
} & Omit<TextProps, "type">;

export const AppText = ({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: AppTextProps) => {
  const getAntType = (): "secondary" | "success" | "danger" | undefined => {
    if (
      variant === "secondary" ||
      variant === "success" ||
      variant === "danger"
    ) {
      return variant;
    }
    return undefined;
  };

  return (
    <AntText
      type={getAntType()}
      className={clsx(
        {
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-lg": size === "lg",
          "text-xl": size === "xl",
          "text-2xl": size === "2xl",
        },
        className,
      )}
      {...props}
    >
      {children}
    </AntText>
  );
};
