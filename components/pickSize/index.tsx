import { useState } from "react";

const PickSize = ({ sizes }: { sizes: string[] }) => {
  const [isActive, setIsActive] = useState<number>(0);
  const handleClick = (idx: number) => {
    setIsActive(idx);
  };
  return (
    <div className="space-y-2">
      <h1 className="uppercase font-semibold">Size: {sizes[isActive]} </h1>
      <div className="flex gap-x-2">
        {sizes.map((item: string, idx: number) => {
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
