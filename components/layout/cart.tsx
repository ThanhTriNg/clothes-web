import { formatPrice } from "@/pages";
import { remove } from "@/redux/reducer/Cart";
import { getCategoriesThunk } from "@/redux/reducer/Categories";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertNameCate } from "../LimitedPromotion";
import { Button } from "../ui/button";
import { findCategory } from "./searchBtn";
import { CartItem } from "@/redux/module";

interface CartProps {
  cartItem: CartItem;
}
const Cart = ({ cartItem }: CartProps) => {
  const { convertPrice: price } = formatPrice(cartItem.product.price);
  const [href, setHref] = useState<string>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);
  const { categoriesInfo } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    setHref(findHref());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findHref = () => {
    const category = findCategory(cartItem.product.categoryId, categoriesInfo);
    const cateName = convertNameCate(category?.name as any);
    const href: string = `/store/${cateName}/detail/${cartItem.product.id}`;
    return href;
  };

  const handleClickRemove = (event: any) => {
    event.preventDefault();
    dispatch(remove(cartItem.product));
  };

  return (
    <Link href={href ? href : ""}>
      <div className="grid grid-cols-6 bg-white items-center justify-center gap-x-4 m-1">
        <Image
          src={cartItem.product.img.main}
          width="200"
          height="150"
          alt={cartItem.product.name}
        />
        <p className="col-span-2">{cartItem.product.name} </p>
        <div className="flex gap-x-2 items-center">
          <p>{price} </p>
        </div>
        <p className="text-center">{cartItem.qty} cái </p>
        <Button
          className="w-2/3"
          variant="destructive"
          onClick={(e) => handleClickRemove(e)}
        >
          <Trash2 size={20} />
        </Button>
      </div>
    </Link>
  );
};

export default Cart;
