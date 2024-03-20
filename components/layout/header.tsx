import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "./nav";
import { MagnifyingGlass, User, ShoppingCart } from "@phosphor-icons/react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/Store";
import { getClothesByNameThunk } from "@/redux/reducer/Clothes";
import useScrollDirection from "@/lib/hooks/useScrollDirection";
import { CardContent, CardHeader, CardTitle, Card } from "../ui/card";
import { convertNameCate } from "../LimitedPromotion";
import { getCategoriesThunk } from "@/redux/reducer/Categories";
import { useRouter } from "next/router";
import { Divide } from "lucide-react";
import ReactLoading from "react-loading";

const Header = () => {
  // const [isScrollDown, setIsScrollDown] = useState<boolean>();

  // const scrollDirection: string | undefined = useScrollDirection();
  // useEffect(() => {
  //   if (scrollDirection === "up") setIsScrollDown(true);
  //   else setIsScrollDown(false);
  // }, [scrollDirection]);
  // console.log(isScrollDown);

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

          <ShoppingCart size={30} className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;

const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedInputValue, setDebouncedInputValue] =
    useState<string>("null");
  const { clothesByName, loadingClothesByName } = useSelector(
    (state: RootState) => state.clothes
  );
  const { categoriesInfo } = useSelector(
    (state: RootState) => state.categories
  );

  const dispatch = useDispatch<AppDispatch>();

  //debounce
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      if (inputValue !== "") {
        setDebouncedInputValue(inputValue);
      } else {
        setDebouncedInputValue("null");
      }
    }, 400);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue]);

  useEffect(() => {
    setInputValue("");
  }, [router]);

  useEffect(() => {
    dispatch(getClothesByNameThunk(debouncedInputValue));
    dispatch(getCategoriesThunk());
  }, [dispatch, debouncedInputValue]);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  function findCategory(categoryId: string | undefined) {
    if (categoriesInfo) {
      return categoriesInfo.find((category) => category.id === categoryId);
    }
  }
  console.log(loadingClothesByName);
  return (
    <>
      <div className="relative group">
        <div className=" relative flex justify-between items-center">
          {!inputValue && (
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 "
            />
          )}
          <Input type="text" onChange={handleInputChange} value={inputValue} />
          {loadingClothesByName && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
              <ReactLoading
                type={"spin"}
                color="#0000ff80"
                height="18px"
                width="18px"
              />
            </div>
          )}
        </div>

        {categoriesInfo && clothesByName && clothesByName.length > 0 && (
          <div className="mt-2 shadow-md absolute w-[200%] bg-gray-50 p-3 -right-1/2 rounded-sm hidden group-focus-within:block">
            {clothesByName.map((item, idx: number) => {
              const category = findCategory(item.categoryId);
              const cateName = convertNameCate(category?.name as any);
              return (
                <div key={`cart-item-${idx}`} className="">
                  <Link href={`/store/${cateName}/detail/${item.id}`}>
                    <div className="grid grid-cols-4 p-2  items-center hover:bg-black/10 hover:cursor-pointer gap-x-3">
                      <Image
                        src={item.img.main}
                        width="0"
                        height="0"
                        sizes="100vw"
                        alt=""
                        className="col-span-1 w-full  !mt-0"
                      />
                      <h1 className="col-span-2"> {item.name} </h1>
                      <h1 className="col-span-1  text-center">
                        {item.price}đ{" "}
                      </h1>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}


      </div>
    </>
  );
};
