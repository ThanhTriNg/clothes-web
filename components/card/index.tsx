import React from "react";
import Image from "next/image";
import { Heart } from "@phosphor-icons/react";
import PickColor from "../pickColor";
import { formatPrice } from "@/pages";
import Link from "next/link";
interface productCardProps {
  className?: string;
  cols?: number;
}
const imgMenVar = "/img/men";

const Card = ({ className, cols }: productCardProps) => {
  let tabCols: string = "";
  switch (cols) {
    case 1:
      tabCols = "grid-cols-1";
      break;
    case 2:
      tabCols = "grid-cols-2";
      break;
    case 3:
      tabCols = "grid-cols-3";
      break;
    case 4:
      tabCols = "grid-cols-4";
      break;
    case 5:
      tabCols = "grid-cols-5";
      break;
    case 6:
      tabCols = "grid-cols-6";
      break;
    case 7:
      tabCols = "grid-cols-7";
      break;
    case 8:
      tabCols = "grid-cols-8";
      break;
    case 9:
      tabCols = "grid-cols-9";
      break;
    case 10:
      tabCols = "grid-cols-10";
      break;
    case 11:
      tabCols = "grid-cols-11";
      break;
    case 12:
      tabCols = "grid-cols-12";
      break;

    default:
      break;
  }
  let name_textSize: string;
  let height: string;
  let price_textSize: string;

  if (cols) {
    if (cols < 4) {
      name_textSize = "text-lg";
      height = "h-[3.5rem]";
      price_textSize = "text-2xl";
    } else {
      name_textSize = "text-base";
      height = "h-[3rem]";
      price_textSize = "text-xl";
    }
  }

  console.log(tabCols);
  return (
    <div className={`grid ${tabCols} gap-8 `}>
      {ListOutstanding.map((item, idx) => {
        const { convertPrice } = formatPrice(item.price);
        return (
          <Link key={`outstanding-${idx}`} href={`/tops/${item.id}`}>
            <div className="relative col-span-1 space-y-4 transition-all hover:scale-105 cursor-pointer select-none">
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
              <p
                className={`truncate-2  font-semibold ${name_textSize} ${height}`}
              >
                {item.name}
              </p>
              <p
                className={`truncate-2 ${price_textSize} font-bold text-primary`}
              >
                {convertPrice}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Card;

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
const colors = ["#E7DFD4", "#535353", "#F3BCB9", "#EFEDF0"];
