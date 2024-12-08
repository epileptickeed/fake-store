import axios from "axios";
import { Product } from "./getProducts";

export async function getSingleProduct(id: string | undefined) {
  const response = await axios.get(
    `https://b4f4768b64f2a594.mokky.dev/products/${id}`
  );
  return response.data as Product;
}
