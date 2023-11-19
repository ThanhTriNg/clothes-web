import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import PickColor from "./pickColor";
import PickSize from "./pickSize";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
const ProductDetailDesc = () => {
  const [rating, setRating] = useState<number>();
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  console.log(rating);

  return (
    <div className="col-span-5 px-4">
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold">AIRism Áo Polo Cổ Thường</h1>
        </div>

        <div className="grid items-center grid-cols-4">
          <div className="col-span-2 space-y-2">
            <h1 className="text-lg font-bold">489.000VND</h1>
            <h1 className="text-primary text-3xl font-bold">391.000VND</h1>
            <h1 className="text-primary text-base font-medium">
              Limited Offer Từ 17 Nov 2023 - 23 Nov 2023
            </h1>
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
          <h1 className="text-base">
            Vải mượt mà, thoáng mát. Một chiếc polo đa năng cho trang phục
            thường ngày hoặc tinh tế.
          </h1>
        </div>
        <div className="border border-solid border-black/10" />
        <div>
          <PickColor colors={colors} size={40} spaceBetween={8} showName />
        </div>
        <div className="border border-solid border-black/10" />
        <PickSize />
        <div className="border border-solid border-black/10" />
        <div className="space-y-2">
          <h1 className="uppercase">Số lượng</h1>
          <Input type="number" min={0} defaultValue={1} className="w-1/3" />
        </div>
        <div>
          <Button className="uppercase w-full">Thêm vào giỏ hàng</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDesc;
const colors = ["#E7DFD4", "#535353", "#F3BCB9", "#EFEDF0"];
