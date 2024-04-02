import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { CategoriesProps } from "@/redux/module";
import {
  getCategoriesThunk,
  getMenSubCateThunk,
  getWomenSubCateThunk,
  saveCateMen,
  saveCateWomen,
} from "@/redux/reducer/Categories";
import { Gender, getGenderThunk } from "@/redux/reducer/Gender";
import { AppDispatch, RootState } from "@/redux/store/Store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertNameCate } from "../LimitedPromotion";

import { getClothesByNameThunk } from "@/redux/reducer/Clothes";

interface NavProps {
  className?: string;
  womenCate: CategoriesProps[];
  menCate: CategoriesProps[];
  genderInfo: Gender[] | null;
}

const Nav = ({ className, womenCate, menCate, genderInfo }: NavProps) => {
  // const dispatch = useDispatch<AppDispatch>();
  // const [womenCate, setWomenCate] = useState<CategoriesProps[]>();
  // const [menCate, setMenCate] = useState<CategoriesProps[]>();
  // const { categoriesInfo, menSubCateInfo, womenSubCateInfo } = useSelector(
  //   (state: RootState) => state.categories
  // );

  // useEffect(() => {
  //   dispatch(getMenSubCateThunk());
  //   dispatch(getWomenSubCateThunk());
  //   dispatch(getCategoriesThunk());
  //   dispatch(getGenderThunk());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (categoriesInfo) {
  //     //women handle
  //     const womenCate = categoriesInfo.filter(
  //       (item) => item.group === 1 || item.group === 3
  //     );
  //     const filterDataWomen = filterData(womenCate, womenSubCateInfo);
  //     const addDataWomen: any = womenCate.map((item, idx) => ({
  //       ...item,
  //       data: filterDataWomen[idx],
  //     }));
  //     setWomenCate(addDataWomen);
  //     dispatch(saveCateWomen(addDataWomen));

  //     //men handle
  //     const menCate = categoriesInfo.filter(
  //       (item) => item.group === 2 || item.group === 3
  //     );
  //     const filterDataMen = filterData(menCate, menSubCateInfo);
  //     const addDataMen: any = menCate.map((item, idx) => ({
  //       ...item,
  //       data: filterDataMen[idx],
  //     }));
  //     setMenCate(addDataMen);
  //     dispatch(saveCateMen(addDataMen));
  //   }
  // }, [categoriesInfo]);

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {genderInfo?.map((item, idx: number) => {
          let cate;
          if (item.name === "Nữ") {
            cate = womenCate;
          } else {
            cate = menCate;
          }

          return (
            <NavigationMenuItem key={`s-${idx}`}>
              <NavigationMenuTrigger className="uppercase xl:text-base text-sm font-bold bg-bg-slate-200 ">
                {item.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  className={`grid gap-2 p-6 lg:w-[800px] md:w-[80vw] ${
                    idx === 0 ? ` grid-cols-4` : ` grid-cols-3`
                  } md:text-base text-sm`}
                >
                  {cate?.map((item, idx) => {
                    const data = item.data;
                    const cateName = convertNameCate(item.name);
                    return (
                      <div key={`clothes-${idx}`} className="space-y-3">
                        <p className="font-semibold uppercase xl:text-base text-sm">
                          {item.name}
                        </p>
                        <div>
                          {data?.map((item, idx) => {
                            return (
                              <ListItem
                                href={`/store/${cateName}`}
                                className="capitalize"
                                key={`${item.name}-${idx}`}
                                title={item.name}
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
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
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
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// export const filterData = (cate: any, subCate: any) => {
//   const filter = cate.map((item1: any) => {
//     const data = subCate?.filter((item2: any) => item2.categoryId === item1.id);
//     return data;
//   });
//   return filter;
// };
