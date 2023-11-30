import React, { useEffect } from "react";
import Card from "../card";
import productCardProps from "../card";
import { ClothesProps } from "@/redux/module";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { getClothesThunk } from "@/redux/reducer/Clothes";
interface ProductListProps {
  className?: string;
  products: ClothesProps[];
}
const ProductList = ({ className, products }: ProductListProps) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-8">
        {products.map((item, idx: number) => {
          return (
            <Card
              key={`product-card-${idx}`}
              id={item.id}
              img={item.img}
              name={item.name}
              price={item.price}
              color={item.color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
