"use client";

import { ClothesPropsData } from "@/redux/module";
import {
  decrement,
  increment,
  productQtyInCartSelector,
} from "@/redux/reducer/Cart";
import { useAppDispatch, useAppSelector } from "@/redux/store/Store";
import QtyBtn from "@/components/QtyBtn";
import { Button } from "@/components/ui/button";

interface AddToBtnProps {
  product: ClothesPropsData;
  size: string;
  color: string;
}

const AddToCartBtn = ({ product, size, color }: AddToBtnProps) => {
  const dispatch = useAppDispatch();
  const qty = useAppSelector((state) => {
    return productQtyInCartSelector(state, product.id, size, color);
  });
  if (!qty)
    return (
      <div>
        {/* <button>Add to cart</button> */}
        <Button
          className="uppercase w-full"
          onClick={() => dispatch(increment({ product, size, color }))}
        >
          Add to cart
        </Button>
      </div>
    );

  return (
    <QtyBtn
      onIncrease={() => dispatch(increment({ product, size, color }))}
      onDecrease={() => dispatch(decrement({ product, size, color }))}
      qty={qty}
    />
  );
};

export default AddToCartBtn;
