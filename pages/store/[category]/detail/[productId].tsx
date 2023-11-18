import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Card from "@/components/card";
import { Heart } from "@phosphor-icons/react";
import ProductDetailSlide from "@/components/ProductDetailSlide";
import ProductDetailDesc from "@/components/ui/ProductDetailDesc";

const imgMenVar = "/img/men";
const imgWomenVar = "/img/women";
const DetailPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [isLike, setIsLike] = useState<boolean>(false);
  const handleClickLike = () => {
    setIsLike((prev) => !prev);
  };

  return (
    <div className="min-h-screen">
      <div className=" bg-white p-2 grid grid-cols-12 gap-x-8">
        <ProductDetailSlide thumbnail={listImg} />

        <ProductDetailDesc />
      </div>
    </div>
  );
};

export default DetailPage;

const listImg = [
  {
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    img: `${imgWomenVar}/bottom/E458340-000/vngoods_31_458340.png`,
  },
  {
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    img: `${imgWomenVar}/bottom/E458340-000/vngoods_31_458340.png`,
  },
];
