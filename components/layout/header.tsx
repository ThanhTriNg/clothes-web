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
        <div className="flex gap-x-10">
          <Search />
          <Link href="/login">
            <User size={30} className="cursor-pointer" />
          </Link>
          <ShoppingCart size={30} className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;

const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");

  const { clothesByName } = useSelector((state: RootState) => state.clothes);

  //debounce
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getClothesByNameThunk(debouncedInputValue));
  }, [dispatch, debouncedInputValue]);

  useEffect(() => {
    console.log(debouncedInputValue);
  }, [debouncedInputValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <MagnifyingGlass size={30} className="cursor-pointer" />
      <Input type="text" onChange={handleInputChange} value={inputValue} />
    </>
  );
};
