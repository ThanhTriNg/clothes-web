import { Combobox } from "@/components/selectBox";
import React from "react";

const Tops = () => {
  return (
    <div className="min-h-screen">
      <div className=" bg-white">
        <h1 className="uppercase font-bold text-3xl p-10">Áo giả lông cừu</h1>

        <div className="flex justify-between">
          <div>
            <h1>Kết quả</h1>
            <p>10 mặt hàng</p>
          </div>
          <div>
            <h1>Sắp xếp theo</h1>
            <Combobox textFilters={textFilters} />
          </div>
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
