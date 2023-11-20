import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/Store";
import {
  getCategoriesThunk,
  getSubCateByCategoryIdThunk,
  getMenSubCateThunk,
  getWomenSubCateThunk,
} from "@/redux/reducer/Categories";
import { getGenderThunk } from "@/redux/reducer/Gender";
import { CategoriesProps, GetSubCateProps, SubCateProps } from "@/redux/module";
const Nav = () => {
  const [subCateMen, setSubCateMen] = useState<SubCateProps[]>();
  const [subCateWomen, setSubCateWomen] = useState<SubCateProps[]>();
  const dispatch = useDispatch<AppDispatch>();

  const { categoriesInfo, menSubCateInfo, womenSubCateInfo } = useSelector(
    (state: RootState) => state.categories
  );
  const { genderInfo } = useSelector((state: RootState) => state.gender);
  // console.log(genderInfo);
  let menClothesTest: CategoriesProps[] | undefined;
  let womenClothesTest: CategoriesProps[] | undefined;
  let subCate: GetSubCateProps | undefined;

  // console.log(categoriesInfo);
  // console.log(menSubCateInfo);
  // console.log(womenSubCateInfo);

  const [cate, setCate] = useState<any>();
  useEffect(() => {
    if (categoriesInfo) {
      setCate(categoriesInfo);
    }
    console.log(cate);
  }, [categoriesInfo, cate]);

  if (categoriesInfo) {
    womenClothesTest = categoriesInfo.filter(
      (item) => item.group === 1 || item.group === 3
    );
    menClothesTest = categoriesInfo.filter(
      (item) => item.group === 2 || item.group === 3
    );
  }
  // useEffect(() => {
  //   subCate.categoryId = formData.categoryId;
  //   if (formData.genderId === "1") {
  //     subCate.subName = "women";
  //   } else if (formData.genderId === "2") {
  //     subCate.subName = "men";
  //   }
  // });

  // useEffect(() => {
  //   genderInfo?.forEach((item) => {
  //     console.log(item.id);
  //     if (item.id === "1") {
  //       subCate?.subName === "women";
  //       dispatch(getAllSubCateThunk("women"));
  //       if (subCateAllInfo) {
  //         setSubCateMen(subCateAllInfo);
  //       }
  //     } else {
  //       subCate?.subName === "men";
  //       dispatch(getAllSubCateThunk("men"));
  //       if (subCateAllInfo) {
  //         setSubCateWomen(subCateAllInfo);
  //       }
  //     }
  //   });
  // }, [dispatch, genderInfo]);

  useEffect(() => {
    dispatch(getMenSubCateThunk());
  }, [dispatch]);
  useEffect(() => {
    if (menSubCateInfo) {
      console.log(menSubCateInfo);
      setSubCateMen(menSubCateInfo);
    }
  }, [menSubCateInfo]);

  useEffect(() => {
    dispatch(getWomenSubCateThunk());
  }, [dispatch]);
  useEffect(() => {
    if (womenSubCateInfo) {
      setSubCateWomen(womenSubCateInfo);
    }
  }, [womenSubCateInfo]);

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getGenderThunk());
  }, [dispatch]);

  const merge = cateTest.map((category: any) => {
    const items = category.name === "Tops" ? clothesTops : clothesBottoms;
    return {
      id: `Merge${category.id.slice(-1)}`,
      name: category.name,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
      })),
    };
  });

  console.log(merge);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {genderInfo &&
          genderInfo.map((item, idx) => {
            let selectClothes;
            if (idx === 0) {
              selectClothes = womenClothesTest;
            }
            if (idx === 1) {
              selectClothes = menClothesTest;
            }
            return (
              <NavigationMenuItem key={`s-${idx}`}>
                <NavigationMenuTrigger className="uppercase text-base font-bold bg-bg-slate-200  ">
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[200px] lg:w-[800px] lg:grid-cols-4">
                    {selectClothes &&
                      selectClothes.map((item, idx) => {
                        return (
                          <div key={`clothes-${idx}`} className="space-y-3">
                            <p className="font-semibold uppercase text-base">
                              {item.name}
                            </p>
                            {/* <div>
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
                            </div> */}
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

const cateTest = [
  {
    id: "Cate1",
    name: "Tops",
  },
  {
    id: "Cate2",
    name: "Bottoms",
  },
];

const clothesTops = [
  {
    id: "ClothesTops1",
    name: "Hoodie",
  },
  {
    id: "ClothesTops2",
    name: "AoKhoac",
  },
  {
    id: "ClothesTops3",
    name: "T",
  },
];

const clothesBottoms = [
  {
    id: "clothesBottoms1",
    name: "Jeans",
  },
  {
    id: "clothesBottoms2",
    name: "QuanDui",
  },
  {
    id: "clothesBottoms3",
    name: "Quan Bo",
  },
];

const merge = [
  {
    id: "Merge1",
    name: "Tops",
    items: [
      {
        id: "ClothesTops1",
        name: "Hoodie",
      },
      {
        id: "ClothesTops2",
        name: "AoKhoac",
      },
      {
        id: "ClothesTops3",
        name: "T",
      },
    ],
  },
  {
    id: "Merge2",
    name: "Bottoms",
    items: [
      {
        id: "clothesBottoms1",
        name: "Jeans",
      },
      {
        id: "clothesBottoms2",
        name: "QuanDui",
      },
      {
        id: "clothesBottoms3",
        name: "Quan Bo",
      },
    ],
  },
];
