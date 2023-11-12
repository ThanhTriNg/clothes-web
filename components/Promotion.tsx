import React from "react";
import Image from "next/image";
import { Heart } from "@phosphor-icons/react";
import PickColor from "./pickColor/PickColor";
import { formatPrice } from "@/pages";
const imgMenVar = "/img/men";
const LimitedPromotion = () => {
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
          <div className=" col-span-8 grid grid-cols-3 gap-8 ">
            {ListOutstanding.map((item, idx) => {
              const { convertPrice } = formatPrice(item.price);
              return (
                <div
                  key={`outstanding-${idx}`}
                  className="relative col-span-1 space-y-4 transition-all hover:scale-105 cursor-pointer select-none"
                >
                  {/* <Heart size={30} weight="fill" color="red" /> */}
                  <Heart
                    className="absolute top-[5%] right-[5%]"
                    size={30}
                    color="black"
                    onClick={() => console.log("click")}
                  />

                  <Image
                    src={item.img}
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt=""
                    // className="w-[260px] h-auto mx-auto "
                    className="w-full h-auto !mt-0"
                  />

                  <PickColor colors={colors} />
                  <p className="truncate-2 text-lg font-semibold min-h-[4.5rem]">
                    {item.name}
                  </p>
                  <p className="truncate-2 text-2xl font-bold text-primary">
                    {convertPrice}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedPromotion;

const ListOutstanding = [
  {
    name: "Áo Parka Chống UV Bỏ Túi (3D Cut) (Chống Nắng)",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 870000,
  },
  {
    name: "Áo Parka 2 mặt",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 740000,
  },
  {
    name: "Áo Thun Soft Brushed Cổ Tròn Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 120000,
  },
  {
    name: "HEATTECH Áo Thun Cổ Tròn Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 9760000,
  },

  {
    name: "Áo Len Vải Sợi Souffle Cổ Tròn Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 415000,
  },
  {
    name: "Áo Len Dệt 3D Vải Souffle Cổ 3 Phân Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 170000,
  },
];
const colors = ["#E7DFD4", "#535353", "#F3BCB9", "#EFEDF0"];
