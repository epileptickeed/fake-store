import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const category = [
  "men's clothing",
  "jewelery",
  "electronics",
  "women's clothing",
] as const;

export const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(20),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  image: z
    .any()
    .refine((files) => files?.length > 0, { message: "Image is required" })
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  // category: z.string(),
  category: z.enum(category, {
    errorMap: () => ({ message: "Please select category" }),
  }),
});
