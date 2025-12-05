"use client";

import { Button } from "antd";
import { ButtonProps } from "antd/es/button";
import clsx from "clsx";

type AppButtonProps = {
  colorType?: "primary" | "success" | "danger";
} & ButtonProps;

export const AppButton = ({
  colorType = "primary",
  className,
  style,
  ...props
}: AppButtonProps) => {
  const getColorStyles = () => {
    const colors = {
      primary: {
        bg: "var(--btn-primary-color)",
        hover: "var(--btn-hover-primary-color)",
      },
      success: {
        bg: "var(--btn-success-color)",
        hover: "var(--btn-hover-success-color)",
      },
      danger: {
        bg: "var(--btn-danger-color)",
        hover: "var(--btn-hover-danger-color)",
      },
    };

    return colors[colorType];
  };

  const colors = getColorStyles();

  return (
    <Button
      className={clsx("!border-none !text-white", className)}
      style={{
        backgroundColor: colors.bg,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!props.disabled) {
          e.currentTarget.style.backgroundColor = colors.hover;
        }
      }}
      onMouseLeave={(e) => {
        if (!props.disabled) {
          e.currentTarget.style.backgroundColor = colors.bg;
        }
      }}
      danger={colorType === "danger"}
      {...props}
    />
  );
};
