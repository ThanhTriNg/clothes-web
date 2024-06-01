"use client";

import { ClothesPropsData } from "@/redux/module";
import {
  decrement,
  increment,
  productQtyInCartSelector,
} from "@/redux/reducer/Cart";
import { useAppDispatch, useAppSelector } from "@/redux/store/Store";
import QtyBtn from "./QtyBtn";
import { Button } from "./ui/button";

interface Props {
  product: ClothesPropsData;
}

const AddToCartBtn = (props: Props) => {
  const dispatch = useAppDispatch();

  const qty = useAppSelector((state) =>
    productQtyInCartSelector(state, props.product.id)
  );
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
