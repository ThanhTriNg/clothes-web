import { useMediaQuery } from "@/hook/use-media-query";
import {
  getIsOpenDrawerCart,
  totalCartItemSelector,
} from "@/redux/reducer/Cart";
import { useAppSelector } from "@/redux/store/Store";
import { User, SignOut } from "@phosphor-icons/react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cart from "./cart";
import DrawerMenu from "../drawerMenu";
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
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { signOut } from "@/redux/reducer/User";
import { toast } from "react-hot-toast";
interface HeaderProps {
  token: string | undefined;
}
const Header = ({ token }: HeaderProps) => {
  const router = useRouter();
  const totalItems = useAppSelector(totalCartItemSelector);
  const cartItems = useAppSelector(
    (state) => state.cartPersistedReducer.cartItems
  );
  const isMobile = useMediaQuery("(max-width:767px)");
  const [isOpen, setIsOpen] = useState(false);
  const [cartActive, setCartActive] = useState(false);
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
      dispatch(saveCateWomen(addDataWomen));
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
      dispatch(saveCateMen(addDataMen));
      setMenCate(addDataMen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesInfo, dispatch]);

  useEffect(() => {
    dispatch(getIsOpenDrawerCart(isOpen));
  }, [isOpen, dispatch]);
  const handleSignOut = () => {
    dispatch(signOut());
    toast.success("Đăng xuất thành công");
    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, 200);
    return () => clearTimeout(timeoutId);
  };
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
            <div onClick={handleSignOut}>
              <SignOut size={24} className="cursor-pointer" />
            </div>
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
                      {cartItems.map((item, idx: number) => {
                        return (
                          <Cart key={`cart-item-${idx}`} cartItem={item} />
                        );
                      })}
                      <Link
                        href="/cart"
                        className="md:w-[40vw] w-[80vw] block mx-auto pb-3"
                      >
                        <p className="text-center bg-primary mt-2 mb-1 p-2 rounded-md text-white">
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
