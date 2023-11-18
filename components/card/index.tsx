import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "@phosphor-icons/react";
import PickColor from "../pickColor";
import { formatPrice } from "@/pages";
import Link from "next/link";

export interface ProductCardProps {
  id: string;
  img: string;
  name: string;
  price: number;
  colors: string[];
}

const Card = ({ id, img, name, price, colors }: ProductCardProps) => {
  const { convertPrice } = formatPrice(price);
  const [isLike, setIsLike] = useState<boolean>(false);
  const handleClickLike = () => {
    setIsLike((prev) => !prev);
  };
  return (
    <div className="relative col-span-1  transition-all hover:scale-105 cursor-pointer select-none">
      {isLike ? (
        <Heart
          className="absolute top-[5%] right-[5%]"
          size={30}
          weight="fill"
          color="red"
          onClick={() => handleClickLike()}
        />
      ) : (
        <Heart
          className="absolute top-[5%] right-[5%]"
          size={30}
          color="black"
          onClick={() => handleClickLike()}
        />
      )}
      <Link href={`/tops/${id}`} className="space-y-4">
        <Image
          src={img}
          width="0"
          height="0"
          sizes="100vw"
          alt=""
          className="w-full h-auto !mt-0"
        />

        <PickColor colors={colors} />
        <p className={`truncate-2  font-semibold text-base h-[3rem]`}>{name}</p>
        <p className={`truncate-2  font-bold text-primary`}>{convertPrice}</p>
      </Link>
    </div>
  );
};

export default Card;
