"use client";

import { CustomLinkProps } from "@/types";

const Link = ({ textStyles, handleClick, children }: CustomLinkProps) => (
  <a onClick={handleClick} className={`flex-1 ${textStyles}`}>
    {children}
  </a>
);

export default Link;
