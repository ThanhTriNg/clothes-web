import { useMediaQuery } from "@/hook/use-media-query";
import {
  getIsOpenDrawerCart,
  totalCartItemSelector,
} from "@/redux/reducer/Cart";
import { useAppSelector } from "@/redux/store/Store";
import { SignOut, User } from "@phosphor-icons/react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DrawerMenu from "../drawerMenu";
import Cart from "./cart";
import Nav from "./nav";
import Search from "./searchBtn";

import { CartItem, CategoriesProps } from "@/redux/module";
import { getCategoriesThunk } from "@/redux/reducer/Categories";
import { signOut } from "@/redux/reducer/User";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
interface HeaderProps {
  token: string | undefined;
}
const Header = ({ token }: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const totalItems = useAppSelector(totalCartItemSelector);
  const cartItems = useAppSelector(
    (state) => state.cartPersistedReducer.cartItems
  );
  const isMobile = useMediaQuery("(max-width:767px)");
  const [womenCate, setWomenCate] = useState<CategoriesProps[]>();
  const [menCate, setMenCate] = useState<CategoriesProps[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const [sortCartItems, setSortCartItems] = useState<CartItem[]>();

  const { categoriesInfo } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    if (isOpen === true) {
      setIsOpen(false);
    }
  }, [router]);

  useEffect(() => {
    if (!!totalItems == false) {
      if (isOpen === true) {
        setIsOpen(false);
      }
      const timeoutId = setTimeout(() => {
        setCartActive(false);
      }, 510);
      return () => clearTimeout(timeoutId);
    } else {
      setCartActive(true);
    }
  }, [isOpen, totalItems]);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  // store status open of drawer cart
  useEffect(() => {
    dispatch(getIsOpenDrawerCart(isOpen));
  }, [isOpen, dispatch]);

  //sign out
  const handleSignOut = () => {
    dispatch(signOut());
    toast.success("Đăng xuất thành công");
    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, 200);
    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    if (categoriesInfo) {
      const womenCategories = categoriesInfo.filter(
        (item) => item.gender === "both" || item.gender === "female"
      );
      const menCategories = categoriesInfo.filter(
        (item) => item.gender === "both" || item.gender === "male"
      );
      setWomenCate(womenCategories);
      setMenCate(menCategories);
    }
  }, [categoriesInfo]);

  useEffect(() => {
    if (cartItems) {
      const sorted = [...cartItems].sort((a, b) => a.product.id - b.product.id);
      setSortCartItems(sorted);
    }
  }, [cartItems]);
  return (
    <header className="h-auto md:h-20 mb-4 sticky top-0 z-20 bg-white shadow-md shadow-slate-300 xl:px-8 md:px-6 p-4">
      <div className="md:flex justify-between items-center h-full xl:max-w-[1300px] mx-auto">
        <div className="md:flex md:gap-x-10 space-y-4">
          <Link href="/" className="">
            <Image
              src="/svg/logo.svg"
              className="mx-auto"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
          {menCate &&
            womenCate &&
            (isMobile ? (
              <DrawerMenu
                className="text-center"
                menCate={menCate}
                womenCate={womenCate}
                genderInfo={genderInfo}
              />
            ) : (
              <Nav
                className="mx-auto"
                menCate={menCate}
                womenCate={womenCate}
                genderInfo={genderInfo}
              />
            ))}
        </div>
        <div className="flex md:gap-x-10 gap-x-2 items-center md:justify-center justify-around">
          <Search />
          {token ? (
            <Link href="/user">
              <User size={24} className="cursor-pointer" />
            </Link>
          ) : (
            <Link href="/login">
              <User size={24} className="cursor-pointer" />
            </Link>
          )}
          {cartActive ? (
            <div className="relative ">
              <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger>
                  <ShoppingCart size={24} className="cursor-pointer" />
                  {!!totalItems && (
                    <div
                      key={totalItems}
                      className="select-none text-white bg-primary rounded-full w-6 text-center absolute -top-2 -right-3 animate-pingOnce "
                    >
                      {totalItems}
                    </div>
                  )}
                  <DrawerContent className=" max-h-[80vh]">
                    <div className="overflow-y-scroll overflow-x-hidden">
                      {sortCartItems?.map((item, idx: number) => {
                        return (
                          <Cart key={`cart-item-${idx}`} cartItem={item} />
                        );
                      })}
                      <Link
                        href="/cart"
                        className="md:w-[40vw] w-[80vw] block mx-auto pb-3"
                      >
                        <p className="text-center bg-primary mt-2 mb-1 p-2 rounded-md text-white hover:scale-105">
                          Đến giỏ hàng
                        </p>
                      </Link>
                    </div>
                  </DrawerContent>
                </DrawerTrigger>
              </Drawer>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
export const filterData = (cate: any, subCate: any) => {
  const filter = cate.map((item1: any) => {
    const data = subCate?.filter((item2: any) => item2.categoryId === item1.id);
    return data;
  });
  return filter;
};

const genderInfo = [
  {
    name: "Women",
  },
  {
    name: "Men",
  },
];
