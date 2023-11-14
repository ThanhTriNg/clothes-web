import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
const imgMenVar = "/img/men";

const ProductDetailSlide = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      className="h-full w-full"
    >
      {listImg.map((img: any, idx: number) => {
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
  );
};
export default ProductDetailSlide;
const listImg = [
  {
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
];
