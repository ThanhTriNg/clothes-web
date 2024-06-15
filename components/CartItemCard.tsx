import { formatPrice } from "@/utils";
import { CartItem } from "@/redux/module";
import { decrement, increment, remove } from "@/redux/reducer/Cart";
import { useAppDispatch } from "@/redux/store/Store";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import QtyBtn from "@/components/QtyBtn";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

interface Props {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: Props) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { convertPrice: price } = formatPrice(cartItem.product.price);

  const handleClickRemove = (event: any) => {
    event.preventDefault();
    dispatch(
      remove({
        product: cartItem.product,
        size: cartItem.size,
        color: cartItem.color,
      })
    );
  };

  return (
    <div>
      <div className="grid grid-cols-8 items-center py-2 gap-x-2 gap-y-4">
        <Image
          src={cartItem.product.imageUrl}
          width="200"
          height="150"
          alt={cartItem.product.name}
          className="md:col-span-1 col-span-full mx-auto"
        />
        <p className="md:col-span-2 col-span-full text-center">
          {cartItem.product.name}
        </p>
        <p className="md:col-span-1 col-span-full text-center">
          size: {cartItem.size}
        </p>
        <div
          className="md:col-span-1 mx-auto col-span-full text-center h-7 w-7"
          style={{ backgroundColor: `#${cartItem.color}` }}
        />
        <div className="md:col-span-2 col-span-6 flex md:justify-end justify-center gap-x-1 items-center">
          <p>{price} </p>
          <p>X</p>

          <QtyBtn
            onDecrease={() =>
              dispatch(
                decrement({
                  product: cartItem.product,
                  size: cartItem.size,
                  color: cartItem.color,
                })
              )
            }
            onIncrease={() =>
              dispatch(
                increment({
                  product: cartItem.product,
                  size: cartItem.size,
                  color: cartItem.color,
                })
              )
            }
            qty={cartItem.qty}
          />
        </div>
        <Button
          className="md:col-span-1 col-end-9 md:w-2/3 col-span-2 md:justify-self-end"
          variant="destructive"
          onClick={(e) => handleClickRemove(e)}
        >
          <Trash2 size={20} />
        </Button>
      </div>
      <div className="bg-black/10 h-1 w-full mb-1" />
    </div>
  );
};

export default CartItemCard;
