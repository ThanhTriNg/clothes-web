import { formatPrice } from "@/helpers";
import { CartItem } from "@/redux/module";
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
    // const category = findCategory(cartItem.product.categoryId, categoriesInfo);
    // const cateName = convertNameCate(category?.name as any);
    const cateName =
      cartItem.product.Sub_Category.Categories[0].name.toLowerCase();
    const href: string = `/store/${cateName}/detail/${cartItem.product.id}`;
    return href;
  };

  const handleClickRemove = (event: any) => {
    event.preventDefault();
    dispatch(remove(cartItem.product));
  };
  console.log(cartItem.product.imageUrl);
  return (
    <Link href={href ? href : ""}>
      <div className="grid md:grid-cols-6 grid-cols-3 bg-white items-center justify-center md:gap-x-4 gap-x-2 px-4 pb-4 pt-2">
        <Image
          src={cartItem.product.imageUrl}
          width="200"
          height="150"
          alt={cartItem.product.name}
        />
        <p className="col-span-2 text-center line-clamp-2">
          {cartItem.product.name}
        </p>
        <div className="text-center">
          <p>{price} </p>
        </div>
        <p className="text-center">{cartItem.qty} cái </p>
        <Button
          className="md:w-2/3"
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
