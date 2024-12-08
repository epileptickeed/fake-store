import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProducts, ProductPagination } from "../utils/getProducts";
import { cn } from "../utils/cn";
import { useFilterStore } from "../store/filters";

interface Props {
  className?: string;
}

export const Pagination: React.FC<Props> = ({ className }) => {
  const { page, setPage } = useFilterStore((state) => state);

  const { data } = useQuery<ProductPagination>({
    queryKey: ["data"],
    queryFn: () => getProducts(),
  });

  const total_pages = data?.meta.total_pages ?? 1;
  const arr = [];
  for (let i = 0; i < total_pages; i++) {
    arr.push(i + 1);
  }

  return (
    <div
      className={cn(
        total_pages === 1
          ? "hidden"
          : "flex items-center my-6 relative self-center",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {arr.map((item) => (
          <div
            className={`border px-4 py-2 rounded-xl cursor-pointer hover:bg-slate-300 transition-all font-bold ${
              page === item ? "bg-slate-300" : ""
            }`}
            key={item}
            onClick={() => setPage(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
