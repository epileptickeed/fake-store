import React from "react";
import { getProducts, Product } from "../utils/getProducts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cn } from "../utils/cn";
import axios from "axios";
import { Star, Trash2 } from "lucide-react";
import LikeButton from "./like-button";
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "../store/filters";
import { useDebounce } from "react-use";

interface Props {
  className?: string;
}

export const Products: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const { filter, search, page } = useFilterStore((state) => state);
  const [debounced, setDebounced] = React.useState("");

  useDebounce(
    () => {
      setDebounced(search);
    },
    500,
    [search]
  );

  const { data: products, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: () => getProducts(filter, debounced, page),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      return axios.delete(`https://b4f4768b64f2a594.mokky.dev/products/${id}`);
    },
  });

  React.useEffect(() => {
    refetch();
  }, [products, refetch, deleteProduct, products]);

  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 place-items-center",
        className
      )}
    >
      {products?.items?.map((item: Product) => (
        <div
          className="w-[300px] h-full border overflow-hidden p-3 rounded-lg relative"
          key={item.id}
          onClick={() => navigate(`/products/${item.id}`)}
        >
          <Trash2
            className="absolute right-3 cursor-pointer hover:text-red-500 transition-all"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              deleteProduct.mutate(item.id);
            }}
          />
          <img
            className="rounded-md object-contain w-full h-[300px] pt-4"
            src={item.image}
            alt={item.title}
          />
          <p className="truncate">{item.title}</p>
          <p className="font-bold">{item.price}$</p>
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2">
              Rating - {item.rating.rate} <Star className="text-yellow-500" />
            </p>

            <div className="" onClick={(e) => e.stopPropagation()}>
              <LikeButton productId={item.id} initialLiked={item.liked} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
