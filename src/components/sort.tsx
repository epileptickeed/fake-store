import React from "react";
import { cn } from "../utils/cn";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../utils/getCategories";
import { Loading } from "./loading";
import { useFilterStore } from "../store/filters";

interface Props {
  className?: string;
}

export const Sort: React.FC<Props> = ({ className }) => {
  const initialFilters: string[] = ["Все", "Избранные"];

  const { filter, setFilter, setPage } = useFilterStore((state) => state);

  const setFilterFunc = (item: string) => {
    setFilter(item);
    setPage(1);
  };

  const {
    data: queryFilters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  const filters = [...initialFilters, ...(queryFilters || [])];

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return "Something went wrong";
  }

  return (
    <div
      className={cn("my-6 flex items-center justify-between gap-4", className)}
    >
      <div className="flex items-center gap-4">
        {filters.map((item, index) => (
          <h1
            className={
              filter === item
                ? "cursor-pointer font-bold text-orange-600"
                : "cursor-pointer"
            }
            onClick={() => setFilterFunc(item)}
            key={index}
          >
            {item}
          </h1>
        ))}
      </div>
      <div>
        <a
          href="/create-product"
          className="border py-2 px-6 rounded-xl hover:bg-gray-200 transition-all"
        >
          Создать продукт
        </a>
      </div>
    </div>
  );
};
