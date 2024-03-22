import { formatPrice } from "@/pages";
import { CartItem } from "@/redux/module";
import { decrement, increment, remove } from "@/redux/reducer/Cart";
import { useAppDispatch } from "@/redux/store/Store";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import QtyBtn from "./QtyBtn";
import { Button } from "./ui/button";

interface Props {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: Props) => {
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
          src={cartItem.product.img.main}
          width="200"
          height="150"
          alt={cartItem.product.name}
          className="col-span-1"
        />
        <p className="col-span-3 text-center">{cartItem.product.name} </p>
        <div className="col-span-2 flex gap-x-2 items-center">
          <p>{price} </p>
          <p>X</p>
          <QtyBtn
            onDecrease={() => dispatch(decrement(cartItem.product))}
            onIncrease={() => dispatch(increment(cartItem.product))}
            qty={cartItem.qty}
          />
        </div>
        <Button
          className="col-span-1 w-2/3"
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
