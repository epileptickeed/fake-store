import axios from "axios";

export type ProductRating = {
  count: number;
  rate: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  liked: boolean;
  rating: ProductRating;
};
export type Meta = {
  current_page: number;
  per_page: number;
  remaining_count: number;
  total_items: number;
  total_pages: number;
};

export type ProductPagination = {
  meta: Meta;
  items: Product[];
};

export async function getProducts(
  filter: string = "",
  search: string = "",
  page: number = 2
) {
  let query = `https://b4f4768b64f2a594.mokky.dev/products`;
  const params: string[] = [];

  if (filter === "Избранные") {
    params.push(`liked=true`);
  } else if (filter !== "Все" && filter !== "") {
    params.push(`category=${filter}`);
  }

  if (page) {
    params.push(`page=${page}`);
  }

  if (search) {
    params.push(`title=*${search}`);
  }

  if (params.length > 0) {
    query += `?${params.join("&")}`;
  }

  const response = await axios.get(`${query}`);
  return response.data as ProductPagination;
}
