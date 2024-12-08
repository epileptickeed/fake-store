import React from "react";
import { cn } from "../utils/cn";

interface Props {
  className?: string;
}

export const NotFound: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-2xl ",
        className
      )}
    >
      The page you are looking for doesnt exist 😟
    </div>
  );
};
