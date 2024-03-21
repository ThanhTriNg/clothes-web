"use client";

import { ClothesProps } from "@/redux/module";
import {
  decrement,
  increment,
  productQtyInCartSelector,
} from "@/redux/reducer/Cart";
import { useAppDispatch, useAppSelector } from "@/redux/store/Store";
import React from "react";
import { Button } from "./ui/button";
import QtyBtn from "./QtyBtn";

interface Props {
  product: ClothesProps;
}

const AddToCartBtn = (props: Props) => {
  const dispatch = useAppDispatch();

  const qty = useAppSelector((state) =>
    productQtyInCartSelector(state, props.product.id)
  );
  console.log(qty);
  if (!qty)
    return (
      <div>
        {/* <button>Add to cart</button> */}
        <Button
          className="uppercase w-full"
          onClick={() => dispatch(increment(props.product))}
        >
          Thêm vào giỏ hàng
        </Button>
      </div>
    );

  return (
    <QtyBtn
      onDecrease={() => dispatch(decrement(props.product))}
      onIncrease={() => dispatch(increment(props.product))}
      qty={qty}
    />
  );
};

export default AddToCartBtn;
