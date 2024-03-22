import Image from "next/image";
import { useEffect } from "react";

import {
  getCategoriesThunk,
  getMenSubCateThunk,
} from "@/redux/reducer/Categories";
import { getClothesThunk } from "@/redux/reducer/Clothes";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { useDispatch, useSelector } from "react-redux";
import Card from "./card";
const imgMenVar = "/img/men";

const LimitedPromotion = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { clothesInfo } = useSelector((state: RootState) => state.clothes);
  const { categoriesInfo } = useSelector(
    (state: RootState) => state.categories
  );
  useEffect(() => {
    dispatch(getClothesThunk());
    dispatch(getMenSubCateThunk());
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  return (
    <div className="bg-white p-3 rounded">
      <div className="space-y-10">
        <h1 className=" text-center text-4xl font-bold uppercase text-primary">
          KHUYẾN MÃI CÓ HẠN
        </h1>
        <div className="grid grid-cols-12 gap-x-8">
          <div className="col-span-4 space-y-4">
            <Image
              src={`${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`}
              width="0"
              height="0"
              sizes="100vw"
              alt=""
              // className="w-[260px] h-auto mx-auto "
              className="w-full h-auto mx-auto"
            />
            <div className="space-y-2">
              <h1 className="text-lg font-bold">
                ÁO KHOÁC GIẢ LÔNG CỪU LOẠI DÀY KÉO KHÓA DÀI TAY
              </h1>
              <p className="text-base">Mềm mại, ấm áp, trọng lượng nhẹ.</p>
              <p className="text-2xl font-bold text-primary">489.000 VND</p>
              <p className="text-base text-primary">
                Khuyến Mãi Có Hạn Từ 10.11 - 16.11.2023
              </p>
            </div>
          </div>
          <div className="col-span-8 grid grid-cols-3 gap-x-4 gap-y-8">
            {clothesInfo &&
              clothesInfo.map((item, idx: number) => {
                let cate: string | undefined;
                categoriesInfo?.forEach((item2) => {
                  if (item.categoryId === item2.id.toString()) {
                    cate = convertNameCate(item2.name);
                  }
                });
                return (
                  <Card
                    key={`product-card-${idx}`}
                    // colors={colors}
                    id={item.id}
                    img={item.img}
                    name={item.name}
                    price={item.price}
                    color={item.color}
                    link={`/store/${cate}`}
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
