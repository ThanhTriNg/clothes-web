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
  const { id } = router.query;
  const [isLike, setIsLike] = useState<boolean>(false);
  const handleClickLike = () => {
    setIsLike((prev) => !prev);
  };
  return (
    <div className="min-h-screen">
      <div className=" bg-white p-6  grid grid-cols-12 gap-x-8">
        <div className="col-span-7 grid grid-cols-7 bg-pink-300 ">
          {/* thumbnail */}
          <div className="col-span-1 grid grid-cols-2 gap-2 mr-2 h-fit ">
            {listImg.map((item, idx: number) => {
              return (
                <div key={idx} className="col-span-1 row-span-1 cursor-pointer">
                  <Image
                    src={item.img}
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt=""
                    className="w-[45px] h-[45px]  "
                  />
                </div>
              );
            })}
          </div>
          <div className="col-span-6 bg-red-200">
            {/* <div className="relative  ">
              {isLike ? (
                <Heart
                  className="absolute top-[5%] right-[5%] cursor-pointer"
                  size={30}
                  weight="fill"
                  color="red"
                  onClick={() => handleClickLike()}
                />
              ) : (
                <Heart
                  className="absolute top-[5%] right-[5%] cursor-pointer"
                  size={30}
                  color="black"
                  onClick={() => handleClickLike()}
                />
              )}
              <Image
                src={`${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`}
                width="0"
                height="0"
                sizes="100vw"
                alt=""
                className="w-full h-full mx-auto select-none"
              />
            </div> */}
            <ProductDetailSlide />
            
          </div>
        </div>
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
