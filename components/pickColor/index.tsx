import React from "react";

interface pickColorProps {
  colors: string[];
}
const PickColor = ({ colors }: pickColorProps) => {
  return (
    <div className="flex gap-1">
      {colors.map((color: string, idx: number) => (
        <div
          key={`pick-color-${idx}`}
          style={{
            backgroundColor: color,
          }}
          className={` h-[20px] w-[20px] `}
        />
      ))}
    </div>
  );
};

export default PickColor;

