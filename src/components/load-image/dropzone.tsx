/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { cn } from "../../utils/cn";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { X } from "lucide-react";

interface Props {
  className?: string;
  onChange: (files: File[] | null) => void;
}

export const Dropzone: React.FC<Props> = ({ className, onChange }) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files?.length < 1) {
        const newFile = acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setFiles(newFile);
        onChange(newFile);
      } else {
        toast.error("Cannot upload more than 1 image");
        return false;
      }
    },
    [files, onChange]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  //   console.log(files?.length);

  const deleteFile = (name: string) => {
    const updatedFiles = files.filter((item) => item.name !== name);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <div
      className={cn(
        "w-full h-full border border-slate-200 rounded-lg border-dashed overflow-hidden object-cover cursor-pointer",
        className
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {files?.length === 0 ? (
        <p className="text-center py-6">Drop the files here ...</p>
      ) : (
        <div className="w-full">
          <div className="grid grid-cols-4 gap-4 p-2">
            <p className="text-slate-500">PREVIEW</p>
            <p className="text-slate-500">NAME</p>
            <p className="text-slate-500">SIZE</p>
            <p className="text-slate-500">STATUS</p>
          </div>
          <hr />
        </div>
      )}
      {files?.map((item: any) => (
        <div key={item.name} className="relative grid grid-cols-4 gap-4 p-2">
          <img height={100} className="w-full" src={item.preview} />
          <p className="text-slate-400">{item.name}</p>
          <p className="text-slate-400">{(item.size / 1024).toFixed(2)} KB</p>
          <button className="self-start place-self-start border border-slate-300 p-2 rounded-lg hover:bg-red-300 transition-all">
            <X onClick={() => deleteFile(item.name)} />
          </button>
        </div>
      ))}
    </div>
  );
};
