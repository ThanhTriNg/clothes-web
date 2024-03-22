import Image from "next/image";

import { SlideShowProps } from "@/common/type";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
