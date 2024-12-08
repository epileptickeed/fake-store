import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../utils/getSingleProduct";
import { cn } from "../utils/cn";
import { Title } from "./title";
import { Product } from "../utils/getProducts";
import { ShoppingCart } from "lucide-react";
import { Container } from "./container";
import { Loading } from "./loading";
import { ChangeProductPopup } from "./change-product-popup";

interface Props {
  className?: string;
}

export const ProductItem: React.FC<Props> = ({ className }) => {
  const params = useParams();
  const [isVisible, setIsVisible] = React.useState(false);

  const {
    data: item,
    isLoading,
    isError,
    refetch,
  } = useQuery<Product>({
    queryKey: ["single-item"],
    queryFn: () => getSingleProduct(params.id),
  });

  React.useEffect(() => {
    refetch();
  }, [item, refetch]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return "something went wrong";
  }

  return (
    <Container className="flex flex-col px-4">
      <button
        className="border rounded-lg px-4 py-2 self-end"
        onClick={() => setIsVisible(true)}
      >
        Изменить продукт
      </button>
      {isVisible && (
        <div className="bg-[#00000050] fixed top-0 left-0 z-10 h-full w-full" />
      )}
      {isVisible && (
        <div className="z-20">
          <ChangeProductPopup
            setIsVisible={setIsVisible}
            item={item}
            refetch={refetch}
          />
        </div>
      )}

      <div className={cn("flex items-center justify-around mt-16", className)}>
        <div className="w-1/2 flex items-center justify-center">
          <img
            className=" rounded-lg w-1/2 h-1/2"
            src={item.image}
            alt={item.title}
          />
        </div>
        <div className="w-1/2">
          <Title text={item.title} size="xl" className="font-bold py-3" />
          <p className="text-ellipsis text-gray-500">{item.description}</p>
          <Title text={`${item.price}$`} size="md" className="font-bold py-3" />
          <button className="font-bold px-12 py-4 rounded-lg flex items-center gap-4 bg-orange-500 hover:bg-orange-400 transition-all">
            <ShoppingCart />
            Add to cart
          </button>
        </div>
      </div>
    </Container>
  );
};
