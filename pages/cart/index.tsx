import React from "react";
import { formatPrice } from "..";
import CartItemCard from "@/components/CartItemCard";
import { totalPriceSelector } from "@/redux/reducer/Cart";
import { useAppSelector } from "@/redux/store/Store";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cartPersistedReducer.cartItems);
  const totalPrice = useAppSelector(totalPriceSelector);
  const { convertPrice } = formatPrice(totalPrice);
  return totalPrice === 0 ? (
    <div className=" h-96 flex items-center justify-center">
      <h1 className="text-2xl text-primary text-center ">
        Giỏ hàng đang trống!
      </h1>
    </div>
  ) : (
    <div className="p-2  ">
      {cartItems.map((item, idx: number) => {
        return <CartItemCard key={`cart-item-${idx}`} cartItem={item} />;
      })}
      <div className="pt-4">
        <p className="text-center text-lg">
          Tổng giá tiền:{" "}
          <strong className=" text-primary">{convertPrice}</strong>
        </p>
      </div>
    </div>
  );
};

export default Cart;
