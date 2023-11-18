import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface SlideShowProps {
  listImg?: any;
  className?: string;
}

const SlideShow = ({ listImg, className }: SlideShowProps) => {
  return (
    <div className={className}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {listImg.map((img: string, idx: number) => {
          return (
            <SwiperSlide key={`slide-${idx}`} className="h-full">
              <Image
                src={img}
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
  );
};

export default SlideShow;
