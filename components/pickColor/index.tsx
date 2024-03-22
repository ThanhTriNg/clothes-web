import React, { useState, useEffect } from "react";

import { AppDispatch, RootState } from "@/redux/store/Store";
import { useDispatch, useSelector } from "react-redux";
import { getColorNameThunk } from "@/redux/reducer/Clothes";
interface PickColorProps {
  colors: string[];
  size?: number;
  spaceBetween?: number;
  showName?: boolean;
}

const PickColor = ({
  colors,
  size = 20,
  spaceBetween = 4,
  showName = false,
}: PickColorProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [colorHex, setColorHex] = useState<string>(
    removeHashFromColorCode(colors[0])
  );
  const [colorName, setColorName] = useState<string>();

  const { colorAPI } = useSelector((state: RootState) => state.clothes);

  useEffect(() => {
    setColorHex(removeHashFromColorCode(colors[0]));
  }, [colors]);

  useEffect(() => {
    if (colorHex) {
      dispatch(getColorNameThunk({ hex: colorHex }));
    }
  }, [colorHex, dispatch]);

  useEffect(() => {
    if (colorAPI) {
      setColorName(colorAPI?.name?.value);
    }
  }, [colorAPI]);

  const handleClick = (color: string) => {
    const removeHash = removeHashFromColorCode(color);
    setColorHex(removeHash);
  };
  
  const sizeText = `${size}px`;
  const spaceBetweenText = `${spaceBetween}px`;

  return (
    <div className="space-y-2">
      {showName ? (
        <h1 className="uppercase font-semibold">Màu sắc: {colorName} </h1>
      ) : (
        ""
      )}
      <div
        className="flex items-center "
        style={{
          gap: spaceBetweenText,
        }}
      >
        {colors.map((color: string, idx: number) => {
          const activeColor = `#${colorHex}`;
          return (
            <div
              onClick={() => handleClick(color)}
              key={`pick-color-${idx}`}
              style={{
                backgroundColor: color,
                height: sizeText,
                width: sizeText,
              }}
              className={`cursor-pointer transition-all ${
                showName && activeColor === color
                  ? `scale-110 border border-solid`
                  : ``
              }  `}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PickColor;

const removeHashFromColorCode = (colorCode: string): string => {
  // Check if the color code starts with '#'
  if (colorCode.startsWith("#")) {
    // Return the color code without the first character (i.e., '#')
    return colorCode.substring(1);
  }

  // If the color code doesn't start with '#', return it as is
  return colorCode;
};
