"use client";

import { Radio } from "antd";
import { RadioGroupProps } from "antd/es/radio";
import clsx from "clsx";

type AppRadioGroupProps = RadioGroupProps;

export const AppRadioGroup = ({
  className,
  children,
  ...props
}: AppRadioGroupProps) => {
  return (
    <Radio.Group className={clsx("w-full", className)} {...props}>
      {children}
    </Radio.Group>
  );
};
