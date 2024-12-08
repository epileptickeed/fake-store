import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react";

const LikeButton = ({
  productId,
  initialLiked,
}: {
  productId: number;
  initialLiked: boolean;
}) => {
  const [liked, setLiked] = useState(initialLiked);

  const likeProduct = useMutation({
    mutationFn: async (id: number) => {
      return axios.patch(`https://b4f4768b64f2a594.mokky.dev/products/${id}`, {
        liked: !liked,
      });
    },
    onSuccess: (data) => {
      setLiked((v) => !v);
      console.log("Продукт обновлен:", data);
    },
    onError: (error) => {
      console.error("Ошибка при обновлении продукта:", error);
    },
  });

  return (
    <button onClick={() => likeProduct.mutate(productId)}>
      <Heart
        className={
          liked
            ? "text-red-400 transition-all"
            : "hover:text-red-400 transition-all"
        }
      />
    </button>
  );
};

export default LikeButton;
