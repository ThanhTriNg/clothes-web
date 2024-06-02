import CheckoutForm from "@/pages/checkout/CheckoutForm";
import OrderSummary from "@/pages/checkout/OrderSummary";
import { CartItem } from "@/redux/module";
import { RootState, useAppSelector } from "@/redux/store/Store";
import { useEffect, useState } from "react";

interface summaryCart {
  product: CartItem[];
  qty: string;
}

const Checkout = () => {
  const cartItems = useAppSelector(
    (state: RootState) => state.cartPersistedReducer.cartItems
  );
  const [summaryCart, setSummaryCart] = useState<summaryCart[]>();
  useEffect(() => {
    const consolidatedCartItems = new Map();
    console.log(consolidatedCartItems);
    cartItems.forEach((item) => {
      const productId = item.product.id;
      const existingItem = consolidatedCartItems.get(productId);
      if (existingItem) {
        existingItem.qty += item.qty;
      } else {
        consolidatedCartItems.set(productId, {
          product: item.product,
          qty: item.qty,
        });
      }
    });
    const outputCartItems = Array.from(consolidatedCartItems.values());
    setSummaryCart(outputCartItems);
  }, [cartItems]);
  console.log(summaryCart);

  return (
    <div>
      <p className="text-center text-2xl font-bold text-tertiary-foreground mb-6">
        Checkout
      </p>
      <div className="grid grid-cols-4 gap-x-10">
        <CheckoutForm className="col-span-3" />
        <OrderSummary className="col-span-1" />
      </div>
    </div>
  );
};

export default Checkout;
