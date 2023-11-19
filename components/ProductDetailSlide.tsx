import React, { useRef, useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";

interface ProductDetailSlide {
  thumbnail: {
    img: string;
  }[];
}
const ProductDetailSlide = ({ thumbnail }: ProductDetailSlide) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<any>(null);

  const updateIndex = () => {
    setCurrentSlide(sliderRef.current.swiper.realIndex);
  };
  const slideTo = (idx: number) => {
    setCurrentSlide(idx);
  };
  useEffect(() => {
    const swiperInstance = sliderRef.current.swiper;

    swiperInstance.slideTo(currentSlide, 500, false);
  }, [currentSlide]);

  useEffect(() => {
    const swiperInstance = sliderRef.current.swiper;

    if (swiperInstance) {
      swiperInstance.on("slideChange", updateIndex);
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.off("slideChange", updateIndex);
      }
    };
  }, []);
  const [rating, setRating] = useState<number>();
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  return (
    <div className="col-span-7 grid grid-cols-7 h-fit">
      {/* thumbnail */}
      <div className="col-span-2 grid grid-cols-2 gap-0 mr-2 h-fit">
        {thumbnail.map((item, idx: number) => {
          return (
            <div
              key={idx}
              className={`col-span-1  cursor-pointer transition-all ${
                currentSlide === idx
                  ? `p-1 border border-black border-solid`
                  : `p-2`
              }`}
              onClick={() => slideTo(idx)}
            >
              <Image
                src={item.img}
                width="0"
                height="0"
                sizes="100vw"
                alt=""
                className="w-full h-full mx-auto "
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-5">
        <Swiper
          ref={sliderRef}
          spaceBetween={0}
          slidesPerView={1}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          className="h-full w-full !flex"
        >
          {thumbnail.map((item, idx: number) => {
            return (
              <SwiperSlide key={`slide-${idx}`} className="h-full">
                <Image
                  src={item.img}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="Banner"
                  className="w-full h-full rounded"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="mt-20 space-y-10 col-span-full">
        <div className="">
          <h1 className="uppercase font-bold text-2xl">Mô tả</h1>
          <Accordion type="multiple" className="ml-4">
            {desc.map((item, idx: number) => {
              return (
                <div key={`desc-${idx}`}>
                  <AccordionItem value={`item-${idx}`}>
                    <AccordionTrigger className="text-lg">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 ml-2">
                      {item.sub.map((sub, idx) => (
                        <p key={`sub-${idx}`} className="text-base">
                          -{sub}{" "}
                        </p>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              );
            })}
          </Accordion>
        </div>
        <div>
          <div className="flex gap-x-4 items-center">
            <h1 className="uppercase font-bold text-2xl">Đánh giá</h1>
            <Rating
              size={20}
              emptyStyle={{ display: "flex" }}
              fillStyle={{ display: "-webkit-inline-box" }}
              onClick={handleRating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailSlide;
const subOverview = [
  "Vải thoáng mát với Kết cấu mềm mại.",
  "Công nghệ DRY và cool Touch.",
  "vải tạo ra một Kiểu dáng đẹp.",
];
const subMaterial = [
  "Thân: 73% Bông, 27% Polyeste/ Bo: 82% Bông, 15% Polyeste, 3% Elastan",
];
const desc = [
  {
    title: "Tổng quan",
    sub: subOverview,
  },
  {
    title: "Chất liệu",
    sub: subMaterial,
  },
];
