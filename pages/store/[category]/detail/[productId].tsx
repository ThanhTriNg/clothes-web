import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Card from "@/components/card";
const imgMenVar = "/img/men";
import { Heart } from "@phosphor-icons/react";
import ProductDetailSlide from "@/components/ProductDetailSlide";

const DetailPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [isLike, setIsLike] = useState<boolean>(false);
  const handleClickLike = () => {
    setIsLike((prev) => !prev);
  };
  return (
    <div className="min-h-screen">
      <div className=" bg-white p-2  grid grid-cols-12 gap-x-8">
     
        <ProductDetailSlide />

        <div className="col-span-5 bg-green-400">details</div>
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
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
];
