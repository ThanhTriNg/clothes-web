import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

import { ProductNavProps, listItemProps } from "@/common/type";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { useEffect } from "react";
import {
  getMenSubCateThunk,
  getWomenSubCateThunk,
} from "@/redux/reducer/Categories";
import { filterData } from "../layout/nav";
import { CategoriesProps, SubCateProps } from "@/redux/module";
import { useRouter } from "next/router";
import { getCategoryData } from "@/pages/store/[category]";

const defaultHref = "/store";

const ProductNav = ({ className, categoryArr }: ProductNavProps) => {
  const router = useRouter();
  const { category } = router.query;

  const [cateVi, setCateVi] = useState<string>();

  const dispatch = useDispatch<AppDispatch>();
  const { menSubCateInfo, womenSubCateInfo } = useSelector(
    (state: RootState) => state.categories
  );
  const [womenCate, setWomenCate] = useState<CategoriesProps[]>();
  const [menCate, setMenCate] = useState<CategoriesProps[]>();

  useEffect(() => {
    dispatch(getMenSubCateThunk());
    dispatch(getWomenSubCateThunk());
  }, [dispatch]);

  useEffect(() => {
    if (categoryArr) {
      //women handle
      const womenCate = categoryArr.filter(
        (item) => item.group === 1 || item.group === 3
      );
      const filterDataWomen = filterData(womenCate, womenSubCateInfo);
      const addDataWomen: any = womenCate.map((item, idx) => ({
        ...item,
        data: filterDataWomen[idx],
      }));
      setWomenCate(addDataWomen);

      //men handle
      const menCate = categoryArr.filter(
        (item) => item.group === 2 || item.group === 3
      );
      const filterDataMen = filterData(menCate, menSubCateInfo);
      const addDataMen: any = menCate.map((item, idx) => ({
        ...item,
        data: filterDataMen[idx],
      }));
      setMenCate(addDataMen);
    }
  }, [categoryArr]);

  useEffect(() => {
    setCateVi(getCategoryData(category as string));
  }, [category]);
  const [getIndex, setGetIndex] = useState<number | undefined>();

  useEffect(() => {
    const index = womenCate?.findIndex((item) => item.name === cateVi);
    setGetIndex(index);
  }, [category, womenCate, cateVi]);
  return (
    <div className={className}>
      <div>
        <div>
          {typeof getIndex !== "undefined" && (
            <Accordion
              type="multiple"
              defaultValue={[`item-${getIndex}`]}
              // defaultValue={[`item-1`]}
            >
              {womenCate?.map((item, idx: number) => {
                const data = item.data;
                let href = "";
                if (item.name === "Áo") {
                  href = `${defaultHref}/tops`;
                } else if (item.name === "Quần") {
                  href = `${defaultHref}/bottoms`;
                } else if (item.name === "Đồ mặc ngoài") {
                  href = `${defaultHref}/outwears`;
                } else if (item.name === "Đầm") {
                  href = `${defaultHref}/dresses`;
                }
                return (
                  <AccordionItem
                    key={`categoryArr-${idx}`}
                    value={`item-${idx}`}
                  >
                    <AccordionTrigger className="font-semibold text-base uppercase">
                      {item.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-y-4 ml-6">
                        {data?.map((item: SubCateProps, idx: number) => {
                          return (
                            <Link href={href} key={`item-product-${idx}`}>
                              <p className="text-sm font-normal hover:font-medium">
                                {item.name}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductNav;
