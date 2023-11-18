import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface ProductNavProps {
  className?: string;
}

const ProductNav = ({ className }: ProductNavProps) => {
  return (
    <div className={className}>
      <div>
        <h1 className="uppercase font-bold text-3xl">Nam</h1>
        <div>
          <Accordion type="single" collapsible>
            {/* <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold text-base uppercase">
                Áo
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-y-3 ml-4">
                  {listTops.map((item: listItemProps, idx: number) => {
                    return (
                      <Link href={item.href} key={`item-product-${idx}`}>
                        <p className="text-sm font-normal">{item.name}</p>
                      </Link>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem> */}
            {listItems.map((nameCategory: string, idx: number) => {
              let selected: listItemProps[];
              if (idx === 0) selected = listOutwears;
              else if (idx === 1) selected = listTops;
              else selected = listBottoms;
              return (
                <AccordionItem key={`category-${idx}`} value={`item-${idx}`}>
                  <AccordionTrigger className="font-semibold text-base uppercase">
                    {nameCategory}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-y-4 ml-6">
                      {selected.map((item: listItemProps, idx: number) => {
                        return (
                          <Link href={item.href} key={`item-product-${idx}`}>
                            <p className="text-sm font-normal hover:font-medium">{item.name}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductNav;

interface listItemProps {
  href: string;
  name: string;
}

const listItems = ["Đồ mặc ngoài", "Áo", "Quần"];
const listOutwears = [
  {
    href: "/",
    name: "Tất cả đồ mặc ngoài",
  },
  {
    href: "/",
    name: "Áo khoác siêu nhẹ",
  },
  {
    href: "/",
    name: "Áo blouson",
  },
  {
    href: "/",
    name: "Áo choàng",
  },
];

const listTops = [
  {
    href: "/",
    name: "Tất cả các quần",
  },
  {
    href: "/",
    name: "Quần Jeans",
  },
  {
    href: "/",
    name: "Quần Casual",
  },
  {
    href: "/",
    name: "Quần Tây",
  },
];

const listBottoms = [
  {
    href: "/",
    name: "Tất cả các quần",
  },
  {
    href: "/",
    name: "Quần Jeans",
  },
  {
    href: "/",
    name: "Quần Casual",
  },
  {
    href: "/",
    name: "Quần Tây",
  },
];
