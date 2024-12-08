import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "../utils/cn";
import { Loading } from "./loading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../utils/zod";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

type FormFields = z.infer<typeof schema>;

export const CreateProduct: React.FC<Props> = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias et, at blanditiis sit in iste nemo! Sit doloribus asperiores laboriosam!",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("POST FORM SUBMITTED");
    const image = data.image[0];
    const imageUrl = URL.createObjectURL(image);
    try {
      await axios.post("https://b4f4768b64f2a594.mokky.dev/products", {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        image: imageUrl,
        rating: {
          rate: 0,
          count: 0,
        },
        liked: false,
      });
      toast.success("Product added");
    } catch (error) {
      console.error(error);
      toast.error(`Something went wrong: ${error}`);
    }
  };

  return (
    <div
      className={cn(
        "fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]",
        className
      )}
    >
      <form
        className="flex flex-col items-center justify-center gap-4"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.title && (
          <div className="text-red-400">{errors.title.message}</div>
        )}
        <input
          className="border outline-slate-300 py-2 px-4 rounded-lg hover:shadow-lg transition-all w-full"
          {...register("title")}
          type="text"
          placeholder="Title"
        />
        {errors.description && (
          <div className="text-red-400">{errors.description.message}</div>
        )}
        <input
          className="border outline-slate-300 py-2 px-4 rounded-lg hover:shadow-lg transition-all w-full"
          {...register("description")}
          type="text"
          placeholder="Description"
        />
        {errors.price && (
          <div className="text-red-400">{errors.price.message}</div>
        )}
        <input
          className="border outline-slate-300 py-2 px-4 rounded-lg hover:shadow-lg transition-all w-full"
          {...register("price")}
          type="number"
          placeholder="Price"
        />
        {/* ЕСЛИ КОГДА-НИБУДЬ ВЕРНЕШЬСЯ СЮДА, ПОПРОБУЙ ПОФИКСИТЬ ЭТО ЧТОБ ОНО РАБОТАЛО, А ТО НЕ ДОБРО КАК-ТО :( */}
        {/* 
        <input
          className="border outline-slate-300 py-2 px-4 rounded-lg hover:shadow-lg transition-all "
          {...register("image")}
          type="text"
          placeholder="Image"
        /> */}
        {/* <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => (
            <LoadImage onChange={onChange} />
          )}
        /> */}
        <input className="w-full" type="file" {...register("image")} />
        {errors.image && typeof errors.image.message === "string" && (
          <p className="text-red-400">{errors.image.message}</p>
        )}
        {errors.category && (
          <div className="text-red-400">{errors.category.message}</div>
        )}
        {/* <input
          className="border outline-slate-300 py-2 px-4 rounded-lg hover:shadow-lg transition-all w-full"
          {...register("category")}
          type="text"
          placeholder="Category"
        /> */}

        <select
          className="border w-full p-2 rounded-lg px-4"
          id="category"
          {...register("category")}
        >
          <option value=""></option>
          <option value="men's clothing">men's clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
          <option value="women's clothing">women's clothing</option>
        </select>

        <div className="relative">
          {isSubmitting ? (
            <Loading className="mt-4" />
          ) : (
            <button
              className="border outline-slate-300 py-2 px-4 rounded-lg hover:shadow-lg transition-all cursor-pointer relative"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
