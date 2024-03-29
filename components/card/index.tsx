import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "@phosphor-icons/react";
import PickColor from "../pickColor";
import { formatPrice } from "@/pages";
import Link from "next/link";

import { ProductCardProps } from "@/common/type";
import { ClothesProps } from "@/redux/module";
import { useRouter } from "next/router";
interface CardProps extends ClothesProps {
  link?: string | undefined;
}

const Card = ({ id, img, name, price, color, link }: CardProps) => {
  const { convertPrice } = formatPrice(price);
  const [isLike, setIsLike] = useState<boolean>(false);
  const handleClickLike = () => {
    setIsLike((prev) => !prev);
  };
  const router = useRouter();
  const { category } = router.query;
  // console.log(category);
  const href = link
    ? `/${link}/detail/${id}`
    : `${category}/detail/${id}`;
  // console.log(href);
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
      <Link href={href} className="space-y-4">
        <Image
          src={img.main}
          width="0"
          height="0"
          sizes="100vw"
          alt=""
          className="w-full h-auto !mt-0"
        />

        <PickColor colors={color} />
        <p className={`truncate-2  font-semibold text-base h-[3rem]`}>{name}</p>
        <p className={`truncate-2  font-bold text-primary`}>{convertPrice}</p>
      </Link>
    </div>
  );
};

export default Card;
