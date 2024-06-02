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
}

const AddToCartBtn = ({ product, size }: AddToBtnProps) => {
  const dispatch = useAppDispatch();
  const qty = useAppSelector((state) => {
    return productQtyInCartSelector(state, product.id, size);
  });
  if (!qty)
    return (
      <div>
        {/* <button>Add to cart</button> */}
        <Button
          className="uppercase w-full"
          onClick={() => dispatch(increment({ product, size }))}
        >
          Add to cart
        </Button>
      </div>
    );

  return (
    <QtyBtn
      onIncrease={() => dispatch(increment({ product, size }))}
      onDecrease={() => dispatch(decrement(product))}
      qty={qty}
    />
  );
};

export default AddToCartBtn;
