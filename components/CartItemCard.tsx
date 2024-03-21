import { CartItem } from "@/redux/module";
import Image from "next/image";
import React from "react";
import QtyBtn from "./QtyBtn";
import { useAppDispatch, useAppSelector } from "@/redux/store/Store";
import { decrement, increment, totalPriceSelector } from "@/redux/reducer/Cart";
import { formatPrice } from "@/pages";

interface Props {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch();
  const totalPrices = useAppSelector(totalPriceSelector);
  const { convertPrice: totalPrice } = formatPrice(totalPrices);
  const { convertPrice: price } = formatPrice(cartItem.product.price);

  return (
    <div>
      <div className="grid grid-cols-3 items-center py-2 gap-x-2">
        <Image
          src={cartItem.product.img.main}
          width="200"
          height="150"
          alt={cartItem.product.name}
        />
        <p className="">{cartItem.product.name} </p>
        <div className="flex gap-x-2 items-center">
          <p>{price} </p>
          <p>X</p>
          <QtyBtn
            onDecrease={() => dispatch(decrement(cartItem.product))}
            onIncrease={() => dispatch(increment(cartItem.product))}
            qty={cartItem.qty}
          />
          {/* <p>= {totalPrice} </p> */}
        </div>
      </div>
      <div className="bg-black/10 h-1 w-full mb-1" />
    </div>
  );
};

export default CartItemCard;
