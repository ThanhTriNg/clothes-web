import React from "react";
import Image from "next/image";
import { Heart } from "@phosphor-icons/react";
import PickColor from "./pickColor";
import { formatPrice } from "@/pages";
import Card from "./card";
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
          <div className="col-span-8 grid grid-cols-3 gap-x-4 gap-y-8">
            {ListOutstanding.map((item, idx: number) => {
              return (
                <Card
                  colors={colors}
                  key={`product-card-${idx}`}
                  id={item.id}
                  img={item.img}
                  name={item.name}
                  price={item.price}
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

const ListOutstanding = [
  {
    id: "0",
    name: "Áo Parka Chống UV Bỏ Túi (3D Cut) (Chống Nắng)(Chống Nắng)",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 870000,
  },
  {
    id: "1",

    name: "Áo Parka 2 mặt",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 740000,
  },
  {
    id: "2",

    name: "Áo Thun Soft Brushed Cổ Tròn Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 120000,
  },
  {
    id: "3",

    name: "HEATTECH Áo Thun Cổ Tròn Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 9760000,
  },

  {
    id: "4",
    name: "Áo Len Vải Sợi Souffle Cổ Tròn Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 415000,
  },
  {
    id: "5",
    name: "Áo Len Dệt 3D Vải Souffle Cổ 3 Phân Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 170000,
  },
];
const colors = ["#E7DFD4", "#535353", "#F3BCB9", "#EFEDF0", "red"];
