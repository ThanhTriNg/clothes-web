import { User } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import CartBtn from "../CartBtn";
import Nav from "./nav";
import Search from "./searchBtn";
import { ShoppingCart, Trash2 } from "lucide-react";
import { CartItem } from "@/redux/module";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store/Store";
import { formatPrice } from "@/pages";
import { useEffect, useState } from "react";
import { totalCartItemSelector } from "@/redux/reducer/Cart";
import { getCategoriesThunk } from "@/redux/reducer/Categories";
import { useDispatch, useSelector } from "react-redux";
import { findCategory } from "./searchBtn";
import { convertNameCate } from "../LimitedPromotion";
import { useRouter } from "next/router";

//test
import { remove } from "@/redux/reducer/Cart";
import { Button } from "../ui/button";

const Header = () => {
  // const [isScrollDown, setIsScrollDown] = useState<boolean>();

  // const scrollDirection: string | undefined = useScrollDirection();
  // useEffect(() => {
  //   if (scrollDirection === "up") setIsScrollDown(true);
  //   else setIsScrollDown(false);
  // }, [scrollDirection]);
  // console.log(isScrollDown);

  const router = useRouter();

  const [activeCart, setActiveCart] = useState<boolean>(false);

  useEffect(() => {
    setActiveCart(false);
  }, [router]);

  const totalItems = useAppSelector(totalCartItemSelector);
  const cartItems = useAppSelector(
    (state) => state.cartPersistedReducer.cartItems
  );

  const handClickCart = () => {
    setActiveCart((cur) => !cur);
  };

  console.log(totalItems);

  return (
    <header className="h-20 mb-4 sticky top-0 z-20 bg-white/90">
      <div className="flex justify-between items-center h-full lg:max-w-[1300px] mx-auto">
        <div className="flex gap-x-10">
          <Link href="/">
            <Image src="/svg/logo.svg" alt="logo" width={50} height={50} />
          </Link>
          <Nav />
        </div>
        <div className="flex gap-x-10 items-center">
          <Search />
          <Link href="/login">
            <User size={30} className="cursor-pointer focus:" />
          </Link>
          {totalItems ? (
            <div onClick={handClickCart} className="relative ">
              <ShoppingCart size={30} className="cursor-pointer" />
              {!!totalItems && (
                <div
                  key={totalItems}
                  className="select-none text-white bg-primary rounded-full w-6 text-center absolute -top-2 -right-3 animate-pingOnce "
                >
                  {totalItems}
                </div>
              )}
              <div
                onClick={(e) => e.stopPropagation()}
                className={`${
                  activeCart ? "block" : "hidden"
                }   absolute shadow-md bg-orange-200 rounded-md w-[600px] mt-2 top-full right-0 z-10 `}
              >
                {cartItems.map((item, idx: number) => {
                  return <Cart key={`cart-item-${idx}`} cartItem={item} />;
                })}
                <Link href="/cart" className="w-[200px] block mx-auto ">
                  <p className="text-center bg-white mt-2 mb-1 p-2 rounded-md text-primary hover:bg-primary hover:text-white">
                    Đến giỏ hàng
                  </p>
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

interface Props {
  cartItem: CartItem;
}

const Cart = ({ cartItem }: Props) => {
  const { convertPrice: price } = formatPrice(cartItem.product.price);
  const [href, setHref] = useState<string>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);
  const { categoriesInfo } = useSelector(
    (state: RootState) => state.categories
  );

  const findHref = () => {
    const category = findCategory(cartItem.product.categoryId, categoriesInfo);
    const cateName = convertNameCate(category?.name as any);
    const href: string = `/store/${cateName}/detail/${cartItem.product.id}`;
    return href;
  };
  useEffect(() => {
    setHref(findHref());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <Button className="w-2/3" variant="destructive" onClick={(e) => handleClickRemove(e)}>
          <Trash2 size={20} />
        </Button>
      </div>
    </Link>
  );
};

export default Header;
