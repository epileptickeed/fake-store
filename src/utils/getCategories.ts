import axios from "axios";

export async function getCategory() {
  const response = await axios.get(
    `https://b4f4768b64f2a594.mokky.dev/categories`
  );
  return response.data as string[];
}
