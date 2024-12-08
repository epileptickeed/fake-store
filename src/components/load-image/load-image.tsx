import React from "react";
import { Dropzone } from "./dropzone";
import { cn } from "../../utils/cn";

interface Props {
  className?: string;
  onChange: (files: File[] | null) => void;
}

export const LoadImage: React.FC<Props> = ({ className, onChange }) => {
  return (
    <div className={cn("w-full", className)}>
      <h1>Upload Image</h1>
      <Dropzone onChange={onChange} />
    </div>
  );
};
