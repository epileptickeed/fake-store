import React from "react";
import { Container } from "./container";
import { Sort } from "./sort";
import { Products } from "./products";
import { Pagination } from "./pagination";

interface Props {
  className?: string;
}

export const Home: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <hr />
      <Container className="px-6 flex flex-col ">
        <Sort />
        <Products />
        <Pagination />
      </Container>
    </div>
  );
};
