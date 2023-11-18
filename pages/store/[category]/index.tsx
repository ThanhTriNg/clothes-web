import ProductList from "@/components/productList";
import ProductNav from "@/components/productNav";
import { Combobox } from "@/components/selectBox";
import { useRouter } from "next/router";

const imgMenVar = "/img/men";
import React, { useState } from "react";
const Category = () => {
  const router = useRouter();
  const { category } = router.query;
  console.log(category);
  let products;
  if (category) {
    products = getCategoryData(category);
  }


  return (
    <div className="min-h-screen">
      <div className=" bg-white p-6 space-y-10">
        <h1 className="uppercase font-bold text-3xl p-10">Áo giả lông cừu</h1>

        <div className="flex justify-between">
          <div className="space-y-3">
            <h1>Kết quả</h1>
            <p>10 mặt hàng</p>
          </div>
          <div className="space-y-3">
            <h1>Sắp xếp theo</h1>
            <Combobox textFilters={textFilters} />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-8">
          <ProductNav className="col-span-4" />
          {products && (
            <ProductList
              className="col-span-8"
              products={products}
              colors={colors}
            />
          )}
        </div>
      </div>

    </div>
  );
};

export default Category;

const textFilters = [
  {
    label: "Tiêu biểu",
  },
  {
    label: "Hàng mới về",
  },
  {
    label: "Từ thấp đến cao",
  },
  {
    label: "Từ cao đến thấp",
  },
];

export interface Product {
  id: string;
  name: string;
  img: string;
  price: number;
}
const getCategoryData = (category: string | string[]): Product[] => {
  // Implement logic to fetch or return data based on the category
  switch (category) {
    case "tops":
      return topsData;
    case "bottoms":
      return bottomsData;
    case "outwears":
      return outwearsData;
    default:
      return [];
  }
};

const topsData = [
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
const bottomsData = [
  {
    id: "0",
    name: "Quần gì đó",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 870000,
  },
  {
    id: "1",

    name: "Quần Parka 2 mặt",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 740000,
  },
  {
    id: "2",

    name: "Quần Thun Soft Brushed Cổ Tròn Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 120000,
  },
  {
    id: "3",

    name: "HEATTECH Quần Thun Cổ Tròn Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 9760000,
  },

  {
    id: "4",
    name: "Quần Len Vải Sợi Souffle Cổ Tròn Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 415000,
  },
  {
    id: "5",
    name: "Quần Len Dệt 3D Vải Souffle Cổ 3 Phân Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 170000,
  },
];
const outwearsData = [
  {
    id: "0",
    name: "Đồ mặc ngoài Parka Chống UV Bỏ Túi (3D Cut) (Chống Nắng)(Chống Nắng)",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 870000,
  },
  {
    id: "1",

    name: "Đồ mặc ngoài Parka 2 mặt",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 740000,
  },
  {
    id: "2",

    name: "Đồ mặc ngoài Thun Soft Brushed Cổ Tròn Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 120000,
  },
  {
    id: "3",

    name: "HEATTECH Đồ mặc ngoài Thun Cổ Tròn Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 9760000,
  },

  {
    id: "4",
    name: "Đồ mặc ngoài Len Vải Sợi Souffle Cổ Tròn Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 415000,
  },
  {
    id: "5",
    name: "Đồ mặc ngoài Len Dệt 3D Vải Souffle Cổ 3 Phân Dài Tay",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 170000,
  },
];