import React, { useState, useEffect } from "react";
import { NavMenu } from "./NavMenu";
import Nav from "./Nav";
import Image from "next/image";
import { MagnifyingGlass, User, ShoppingCart } from "@phosphor-icons/react";
import useScrollDirection from "@/lib/hooks/useScrollDirection";
import Link from "next/link";

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
          <MagnifyingGlass size={30} className="cursor-pointer" />
          <User size={30} className="cursor-pointer" />
          <ShoppingCart size={30} className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
