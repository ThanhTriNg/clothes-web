import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useState } from "react";

import { ProductNavProps } from "@/common/type";

import { AppDispatch, RootState } from "@/redux/store/Store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategoryData } from "@/pages/store/[category]";
import { SubCateProps } from "@/redux/module";
import { useRouter } from "next/router";

const defaultHref = "/store";

const ProductNav = ({ className, categoryArr }: ProductNavProps) => {
  const router = useRouter();
  const { category: categoryName } = router.query;

  const [getIndex, setGetIndex] = useState<number | undefined>();

  useEffect(() => {
    if (typeof categoryName === "string") {
      const index = categoryArr?.findIndex(
        (item) => item.name.toLowerCase() === categoryName
      );
      setGetIndex(index);
    } else {
      setGetIndex(999);
    }
  }, [categoryArr, categoryName]);

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
              {/* {saveCateWomen?.map((item, idx: number) => {
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
              })} */}
              {categoryArr?.map((item, idx: number) => {
                const lowerCate = item.name.toLowerCase();
                const subCate = item.Sub_Categories;
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
                        {subCate.map((item, idx: number) => {
                          return (
                            <Link
                              href={`${defaultHref}/${lowerCate}`}
                              key={`item-product-${idx}`}
                            >
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
