import React from "react";
import { cn } from "../utils/cn";
import { Loader2Icon } from "lucide-react";

interface Props {
  className?: string;
}

export const Loading: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]",
        className
      )}
    >
      <Loader2Icon className="animate-spin" />
    </div>
  );
};
