import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "@phosphor-icons/react";
import PickColor from "../pickColor";
import { formatPrice } from "@/pages";
import Link from "next/link";

import { ProductCardProps } from "@/common/type";
import { CategoriesProps, ClothesProps } from "@/redux/module";
import { useRouter } from "next/router";
import { convertNameCate } from "../LimitedPromotion";
interface CardProps extends ClothesProps {
  link?: string | undefined;
  categoriesInfo?: CategoriesProps[];
}

const Card = ({
  id,
  img,
  name,
  price,
  color,
  link,
  categoryId,
  categoriesInfo,
}: CardProps) => {
  const { convertPrice } = formatPrice(price);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [categoryTest, setCategoryTest] = useState<any>();

  const handleClickLike = () => {
    setIsLike((prev) => !prev);
  };
  const router = useRouter();
  const { category } = router.query;

  const getCategoryNameById = (categoryId: string) => {
    const cate = categoriesInfo?.find((item) => item.id === categoryId);
    return cate?.name;
  };
  useEffect(() => {
    if (categoryId) {
      const cateName = getCategoryNameById(categoryId);
      if (cateName) {
        setCategoryTest(convertNameCate(cateName));
      }
    }
  }, [categoryId]);

  useEffect(() => {
    console.log(categoryTest);
  }, [categoryTest]);

  let href = "";
  if (link) {
    href = `/${link}/detail/${id}`;
  } else if (category) {
    href = `/store/${category}/detail/${id}`;
  } else {
    href = `/store/${categoryTest}/detail/${id}`;
  }

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
