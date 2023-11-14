import React from "react";
import Card from "../card";
import productCardProps from "../card";

interface productCardProps {
  className?: string;
}
const imgMenVar = "/img/men";
const ProductCard = ({ className }: productCardProps) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-8">
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
  );
};

export default ProductCard;
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
const colors = ["#E7DFD4", "#535353", "#F3BCB9", "#EFEDF0","red"];
