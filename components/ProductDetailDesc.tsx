import { formatPrice } from "@/pages";
import { ClothesProps } from "@/redux/module";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import AddToCartBtn from "./AddToCartBtn";
import PickColor from "./pickColor";
import PickSize from "./pickSize";
interface ProductDetailProps {
  clothes: ClothesProps;
}
const ProductDetailDesc = ({ clothes }: ProductDetailProps) => {
  const [rating, setRating] = useState<number>();
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  const { convertPrice } = formatPrice(clothes.price);

  return (
    <div className="col-span-full md:col-span-5 px-4">
      <div className="space-y-4">
        <div>
          <h1 className="xl:text-4xl md:text-2xl text-lg font-bold uppercase ">{clothes.name} </h1>
        </div>

        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <h1 className="text-lg font-bold">{convertPrice} </h1>
          </div>
          <div className="col-span-1">
            <Rating
              size={18}
              emptyStyle={{ display: "flex" }}
              fillStyle={{ display: "-webkit-inline-box" }}
              onClick={handleRating}
            />
          </div>
        </div>
        <div>
          <h1 className="text-sm md:text-base">{clothes.desc_sort}</h1>
        </div>
        <div className="border border-solid border-black/10" />
        <div>
          <PickColor
            colors={clothes.color}
            size={40}
            spaceBetween={8}
            showName
          />
        </div>
        <div className="border border-solid border-black/10" />
        <PickSize size={clothes.size} />
        <div className="border border-solid border-black/10" />
      
        <div>
          {/* <Button className="uppercase w-full">Thêm vào giỏ hàng</Button> */}
          <AddToCartBtn product={clothes} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDesc;
const colors = ["#E7DFD4", "#535353", "#F3BCB9", "#EFEDF0"];
