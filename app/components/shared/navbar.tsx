"use client";

import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

type NavbarProps = {
  className?: string;
};

const menuItems: MenuProps["items"] = [
  {
    key: "/multiple",
    label: "Multiple Choice",
  },
  {
    key: "/flashcard",
    label: "Flashcard",
  },
];

export const Navbar = ({ className }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[pathname]}
      items={menuItems}
      onClick={handleMenuClick}
      className={clsx("mb-6", className)}
    />
  );
};
