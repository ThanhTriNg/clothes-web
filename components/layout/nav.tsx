import React from "react";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const Nav = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {sex.map((name, idx) => {
          let selectClothes;
          if (idx === 0) {
            selectClothes = womenClothes;
          }
          if (idx === 1) {
            selectClothes = menClothes;
          }
          return (
            <NavigationMenuItem key={`s-${idx}`}>
              <NavigationMenuTrigger className="uppercase text-base font-bold bg-bg-slate-200  ">
                {name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[200px] lg:w-[800px] lg:grid-cols-4">
                  {selectClothes &&
                    selectClothes.map((clothe, idx) => {
                      const item = clothe.item;
                      return (
                        <div key={`clothes-${idx}`} className="space-y-3">
                          <p className="font-semibold uppercase text-base">
                            {clothe.title}
                          </p>
                          <div>
                            {item.map((name, idx) => {
                              return (
                                <ListItem
                                  href="/"
                                  className="capitalize"
                                  title={name}
                                  key={`${name}-${idx}`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Nav;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const sex = ["Nữ", "Nam"];

const menOuterwearItem = [
  "Tất cả đồ mặc ngoài",
  "Áo khoác siêu nhẹ",
  "Áo blouson",
  "Áo Choàng",
];

const menTopItem = [
  "Tất cả áo",
  "Áo giả lông cừu",
  "Hoodie",
  "Áo len",
  "Áo thun",
  "Áo polo",
];
const menBottomItem = [
  "Tất cả quần",
  "Quần Jeans",
  "Quần ống rộng",
  "Quần tây",
  "Quần nỉ",
  "Quần Legging",
];
const menClothes = [
  {
    title: "Đồ mặc ngoài",
    item: menOuterwearItem,
  },
  {
    title: "Áo",
    item: menTopItem,
  },
  {
    title: "Quần",
    item: menBottomItem,
  },
];

const womenOuterwearItem = [
  "Tất cả đồ mặc ngoài",
  "Áo khoác siêu nhẹ",
  "Áo blouson",
  "Áo Choàng",
];

const womenTopItem = [
  "Tất cả áo",
  "Áo giả lông cừu",
  "Hoodie",
  "Áo len",
  "Áo thun",
  "Áo polo",
];
const womenBottomItem = [
  "Tất cả quần",
  "Quần Jeans",
  "Quần ống rộng",
  "Quần tây",
  "Quần nỉ",
  "Quần Legging",
];
const womenDress = ["Đầm", "Chân váy"];

const womenClothes = [
  {
    title: "Đồ mặc ngoài",
    item: womenOuterwearItem,
  },
  {
    title: "Áo",
    item: womenTopItem,
  },
  {
    title: "Quần",
    item: womenBottomItem,
  },
  {
    title: "Đầm",
    item: womenDress,
  },
];
