import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import PickColor from "./pickColor";
import PickSize from "./pickSize";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ClothesProps } from "@/redux/module";
import { formatPrice } from "@/pages";
import AddToCartBtn from "./AddToCartBtn";
interface ProductDetailProps {
  clothes: ClothesProps;
}
const ProductDetailDesc = ({ clothes }: ProductDetailProps) => {
  const [rating, setRating] = useState<number>();
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  const { convertPrice } = formatPrice(clothes.price);

  return (
    <div className="col-span-5 px-4">
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold">{clothes.name} </h1>
        </div>

        <div className="grid items-center grid-cols-4">
          <div className="col-span-2 space-y-2">
            <h1 className="text-lg font-bold">{convertPrice} </h1>
            {/* <h1 className="text-primary text-3xl font-bold">391.000VND</h1> */}
            {/* <h1 className="text-primary text-base font-medium">
              Limited Offer Từ 17 Nov 2023 - 23 Nov 2023
            </h1> */}
          </div>
          <div className="col-start-4">
            <Rating
              size={20}
              emptyStyle={{ display: "flex" }}
              fillStyle={{ display: "-webkit-inline-box" }}
              onClick={handleRating}
            />
          </div>
        </div>
        <div>
          <h1 className="text-base">{clothes.desc_sort}</h1>
        </div>
        <div className="border border-solid border-black/10" />
        <div>
          <PickColor
            colors={clothes.color}
            size={40}
            spaceBetween={8}
            showName
          />
        </div>
        <div className="border border-solid border-black/10" />
        <PickSize size={clothes.size} />
        <div className="border border-solid border-black/10" />
      
        <div>
          {/* <Button className="uppercase w-full">Thêm vào giỏ hàng</Button> */}
          <AddToCartBtn product={clothes} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDesc;
const colors = ["#E7DFD4", "#535353", "#F3BCB9", "#EFEDF0"];
