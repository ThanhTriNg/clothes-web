import { formatPrice } from "@/helpers";
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
  const { sizeCode } = router.query;

  const dispatch = useAppDispatch();
  const { convertPrice: price } = formatPrice(cartItem.product.price);

  const handleClickRemove = (event: any) => {
    event.preventDefault();
    dispatch(remove(cartItem.product));
  };

  return (
    <div>
      <div className="grid grid-cols-7 items-center py-2 gap-x-2">
        <Image
          src={cartItem.product.imageUrl}
          width="200"
          height="150"
          alt={cartItem.product.name}
          className="md:col-span-1 col-span-3"
        />
        <p className="md:col-span-3 col-span-4 text-center">
          {cartItem.product.name}
        </p>
        <div className="md:col-span-2 col-end-7 col-start-1 flex justify-end gap-x-1 items-center">
          <p>{price} </p>
          <p>X</p>
          {typeof sizeCode === "string" && (
            <QtyBtn
              onDecrease={() => dispatch(decrement(cartItem.product))}
              onIncrease={() =>
                dispatch(
                  increment({ product: cartItem.product, size: sizeCode })
                )
              }
              qty={cartItem.qty}
            />
          )}
        </div>
        <Button
          className="md:col-span-1 col-end-8 md:w-2/3"
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
