import { X } from "lucide-react";
import React from "react";
import { cn } from "../utils/cn";
import { Product } from "../utils/getProducts";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  setIsVisible: (value: boolean) => void;
  item: Product;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch: any;
}

export const ChangeProductPopup: React.FC<Props> = ({
  className,
  setIsVisible,
  item,
  refetch,
}) => {
  const [title, setTitle] = React.useState(item.title);
  const [description, setDescription] = React.useState(item.description);
  const [price, setPrice] = React.useState(item.price);

  const updateProduct = useMutation({
    mutationFn: async (id: number) => {
      return await axios.patch(
        `https://b4f4768b64f2a594.mokky.dev/products/${id}`,
        {
          title: title,
          description: description,
          price: price,
        }
      );
    },
    onSuccess: () => {
      toast.success("Edited");
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
      refetch();
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error}`);
    },
  });

  return (
    <div
      className={cn(
        "w-[400px] h-[400px] fixed bg-white left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] px-4 py-10 rounded-xl flex flex-col gap-6",
        className
      )}
    >
      <X
        className="cursor-pointer absolute right-1 top-1"
        onClick={() => setIsVisible(false)}
      />
      <label htmlFor="title">
        Title
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border outline-none rounded-lg p-2"
        />
      </label>

      <label htmlFor="description">
        Description
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border outline-none rounded-lg p-2"
        />
      </label>

      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          className="w-full border outline-none rounded-lg p-2"
        />
      </label>

      <button
        className="border px-4 py-2 rounded-xl cursor-pointer hover:bg-slate-300 transition-all font-bold"
        onClick={() => updateProduct.mutate(item.id)}
      >
        Отправить
      </button>
    </div>
  );
};
