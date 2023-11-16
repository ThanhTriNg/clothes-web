import ProductList from "@/components/productList";
import ProductNav from "@/components/productNav";
import { Combobox } from "@/components/selectBox";
import React from "react";

const Tops = () => {
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
          {/* <ProductList className="col-span-8"/> */}
        </div>
      </div>
    </div>
  );
};

export default Tops;

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


