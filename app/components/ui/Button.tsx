"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  color?: "red" | "black" | "white" | "blue" | "green" | "yellow";
  external?: boolean;
  className?: string;
};

const colorStyles = {
  red: "bg-red-600 hover:bg-red-700 text-white",
  black: "bg-black hover:bg-gray-800 text-white",
  white: "bg-white hover:bg-gray-200 text-black",
  blue: "bg-blue-600 hover:bg-blue-700 text-white",
  green: "bg-green-600 hover:bg-green-700 text-white",
  yellow: "bg-yellow-500 hover:bg-yellow-600 text-black",
};

export default function Button({
  href,
  children,
  color = "blue",
  external = false,
  className = "",
}: ButtonProps) {
  const style = colorStyles[color] ?? colorStyles.blue;

  const btnClass = `px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105 ${style} ${className}`;

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.95 }}
        className={btnClass}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Link href={href} className={btnClass}>
        {children}
      </Link>
    </motion.div>
  );
}
