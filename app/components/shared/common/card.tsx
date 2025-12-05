"use client";

import { Card } from "antd";
import { CardProps } from "antd/es/card";
import clsx from "clsx";

type AppCardProps = {
  variant?: "default" | "shadow";
} & Omit<CardProps, "variant">;

export const AppCard = ({
  variant = "default",
  className,
  ...props
}: AppCardProps) => {
  return (
    <Card
      className={clsx(
        {
          "shadow-lg": variant === "shadow",
        },
        className,
      )}
      {...props}
    />
  );
};
