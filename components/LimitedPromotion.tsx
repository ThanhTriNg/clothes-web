import Image from "next/image";
import { useEffect } from "react";

import {
  getCategoriesThunk,
  // getMenSubCateThunk,
} from "@/redux/reducer/Categories";
import { getClothesThunk } from "@/redux/reducer/Clothes";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { useDispatch, useSelector } from "react-redux";
import Card from "./card";
const imgMenVar = "/img/men";

const LimitedPromotion = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { clothesInfoData } = useSelector((state: RootState) => state.clothes);

  useEffect(() => {
    dispatch(getClothesThunk("0"));
  }, [dispatch]);

  console.log(clothesInfoData);
  return (
    <div className="bg-white p-3 rounded">
      <div className="space-y-10">
        <h1 className=" text-center xl:text-4xl text-2xl font-bold uppercase text-primary">
          LIMITED PROMOTION
        </h1>
        <div className="sm:grid sm:grid-cols-12 sm:gap-x-8">
          <div className="sm:col-span-4 text-center space-y-4 sm:mb-0 mb-8 sm:mx-0">
            <Image
              src={`${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`}
              width="300"
              height="300"
              sizes="(max-width: 640px) 100vw, 33vw"
              alt="Image"
              className="mx-auto"
            />
            <div className="space-y-2">
              <h1 className="text-lg font-bold">
                Thick Faux Shearling Jacket with Zipper and Long Sleeves
              </h1>
              <p className="text-base">Soft, warm, lightweight.</p>
              <p className="text-2xl font-bold text-primary">489.000 VND</p>
              <p className="text-base text-primary">
                Limited Promotion from 11/10 to 11/16/2023
              </p>
            </div>
          </div>
          <div className="sm:col-span-8 col-span-12 grid sm:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8 ">
            {clothesInfoData &&
              clothesInfoData.map((item, idx: number) => {
                const cateName =
                  item.Sub_Category?.Categories[0].name.toLocaleLowerCase();
                return (
                  <Card
                    key={`product-card-${idx}`}
                    // colors={colors}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    price={item.price}
                    colors={item.colors}
                    description={item.description}
                    link={`/store/${cateName}`}
                    Sub_Category={item.Sub_Category}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedPromotion;

export const convertNameCate = (name: string) => {
  if (name === "Đồ mặc ngoài") {
    return "outwears";
  } else if (name === "Áo") {
    return "tops";
  } else if (name === "Quần") {
    return "bottoms";
  } else if (name === "Đầm") {
    return "dresses";
  }
};
