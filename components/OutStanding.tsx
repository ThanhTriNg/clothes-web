import React from "react";
import Image from "next/image";
const imgMenVar = "/img/men";

const OutStanding = () => {
  return (
    <div className="bg-white p-3 rounded">
      <div className="text-center space-y-10">
        <h1 className="text-4xl font-bold uppercase">Danh mục nổi bật</h1>
        <div className="grid grid-cols-12 gap-y-6">
          {ListOutstanding.map((item, idx) => (
            <div
              key={`outstanding-${idx}`}
              className="col-span-3 mx-auto space-y-2 transition-all hover:scale-105 cursor-pointer "
            >
              <Image
                src={item.img}
                width="0"
                height="0"
                sizes="100vw"
                alt=""
                // className="w-[260px] h-auto mx-auto "
                className="w-4/5 h-auto mx-auto "
              />
              <p className="truncate-2"> {item.name} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutStanding;

const ListOutstanding = [
  {
    name: "Đồ mặc ngoài",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    name: "Đồ nỉ",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    name: "Áo len",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    name: "Áo giả lông cừu",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },

  {
    name: "Áo sơ mi",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    name: "Áo thun",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    name: "Quần dài",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    name: "Đầm",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
];
