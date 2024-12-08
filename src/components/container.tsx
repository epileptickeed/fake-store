import React from "react";
import { cn } from "../utils/cn";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={cn("max-w-[1440px] mx-auto", className)}>{children}</div>
  );
};
