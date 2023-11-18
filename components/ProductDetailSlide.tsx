import React, { useRef, useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";


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

  useEffect(() => {}, []);
  return (
    <div className="col-span-7 grid grid-cols-7">
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
      <div className="col-span-5 bg-red-200">
        <Swiper
          ref={sliderRef}
          spaceBetween={0}
          slidesPerView={1}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          className="h-full w-full !flex"
        >
          {/* <CustomButton /> */}

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
    </div>
  );
};
export default ProductDetailSlide;
