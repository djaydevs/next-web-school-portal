"use client";

import React, { ButtonHTMLAttributes } from "react";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//Utility function for merging tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface IPageButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  to: string;
  className?: string;
}

const PageButton: React.FC<IPageButton> = ({
  children,
  to,
  className,
  ...props
}) => {
  const handleClick = () => {
    window.location.href = to;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "py-4 px-6 rounded-full text-xs font-bold transition duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default PageButton;
