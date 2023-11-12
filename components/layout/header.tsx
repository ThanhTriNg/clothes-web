import React from "react";
import { NavMenu } from "./NavMenu";
import Nav from "./Nav";
import Image from "next/image";
import { MagnifyingGlass, User, ShoppingCart } from "@phosphor-icons/react";

const Header = () => {
  return (
    <header className="h-20 mb-4 sticky top-0 z-20">
      <div className="flex justify-between items-center h-full ">
        <div className="flex gap-x-10">
          <Image src="/svg/logo.svg" alt="logo" width={50} height={50} />
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
