import React from "react";
import Card from "../card";
import productCardProps from "../card";
import { Product } from "@/pages/store/[category]";
interface ProductListProps {
  className?: string;
  products: Product[];
  colors: string[];
}
const imgMenVar = "/img/men";
const ProductList = ({ className, products, colors }: ProductListProps) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-8">
        {products.map((item, idx: number) => {
          return (
            <Card
              colors={colors}
              key={`product-card-${idx}`}
              id={item.id}
              img={item.img}
              name={item.name}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;

