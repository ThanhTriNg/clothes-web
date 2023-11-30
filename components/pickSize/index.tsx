import { useState } from "react";

const PickSize = ({ size }: any) => {
  const [isActive, setIsActive] = useState<number>();
  const handleClick = (idx: number) => {
    setIsActive(idx);
  };
  return (
    <div className="space-y-2">
      <h1 className="uppercase font-semibold">Kích cỡ: Nam S</h1>
      <div className="flex gap-x-2">
        {size.map((item: string, idx: number) => {
          return (
            <div
              key={`size-${item}`}
              className={`cursor-pointer border-solid border border-black/10  w-11 h-11 grid justify-center items-center transition-all${
                isActive === idx ? "scale-110 bg-primary " : ""
              }`}
              onClick={() => handleClick(idx)}
            >
              <h1 className="select-none">{item}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PickSize;

const size = [
  {
    size: "XS",
  },
  {
    size: "S",
  },
  {
    size: "M",
  },
  {
    size: "L",
  },
];
