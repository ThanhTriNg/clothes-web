import { useMediaQuery } from "@/hook/use-media-query";
import { totalCartItemSelector } from "@/redux/reducer/Cart";
import { useAppSelector } from "@/redux/store/Store";
import { User } from "@phosphor-icons/react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cart from "./cart";
import DrawerMenu from "./drawerMennu";
import Nav from "./nav";
import Search from "./searchBtn";

import { CategoriesProps } from "@/redux/module";
import {
  getCategoriesThunk,
  getMenSubCateThunk,
  getWomenSubCateThunk,
  saveCateMen,
  saveCateWomen,
} from "@/redux/reducer/Categories";
import { getGenderThunk } from "@/redux/reducer/Gender";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
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

  //test .nav
  const dispatch = useDispatch<AppDispatch>();
  const [womenCate, setWomenCate] = useState<CategoriesProps[]>();
  const [menCate, setMenCate] = useState<CategoriesProps[]>();
  const { categoriesInfo, menSubCateInfo, womenSubCateInfo } = useSelector(
    (state: RootState) => state.categories
  );
  const { genderInfo } = useSelector((state: RootState) => state.gender);

  useEffect(() => {
    dispatch(getMenSubCateThunk());
    dispatch(getWomenSubCateThunk());
    dispatch(getCategoriesThunk());
    dispatch(getGenderThunk());
  }, [dispatch]);
  useEffect(() => {
    if (categoriesInfo) {
      //women handle
      const womenCate = categoriesInfo.filter(
        (item) => item.group === 1 || item.group === 3
      );
      const filterDataWomen = filterData(womenCate, womenSubCateInfo);
      const addDataWomen: any = womenCate.map((item, idx) => ({
        ...item,
        data: filterDataWomen[idx],
      }));
      setWomenCate(addDataWomen);

      //men handle
      const menCate = categoriesInfo.filter(
        (item) => item.group === 2 || item.group === 3
      );
      const filterDataMen = filterData(menCate, menSubCateInfo);
      const addDataMen: any = menCate.map((item, idx) => ({
        ...item,
        data: filterDataMen[idx],
      }));
      setMenCate(addDataMen);
    }
  }, [categoriesInfo]);

  const isMobile = useMediaQuery("(max-width:767px)");
  return (
    <header className="h-auto md:h-20 mb-4 sticky top-0 z-20 bg-white/90 xl:px-8 md:px-6 p-4">
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
                genderInfo ={genderInfo}
              />
            ) : (
              <Nav
                className="mx-auto"
                menCate={menCate}
                womenCate={womenCate}
                genderInfo ={genderInfo}
              />
            ))}
        </div>
        <div className="flex md:gap-x-10 gap-x-2 items-center md:justify-center justify-around">
          <Search />
          <Link href="/login">
            <User size={24} className="cursor-pointer " />
          </Link>
          {totalItems ? (
            <div onClick={handClickCart} className="relative ">
              <ShoppingCart size={24} className="cursor-pointer" />
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

export default Header;
export const filterData = (cate: any, subCate: any) => {
  const filter = cate.map((item1: any) => {
    const data = subCate?.filter((item2: any) => item2.categoryId === item1.id);
    return data;
  });
  return filter;
};
