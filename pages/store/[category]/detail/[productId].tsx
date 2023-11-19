import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import ProductDetailDesc from "@/components/ProductDetailDesc";
import ProductDetailSlide from "@/components/ProductDetailSlide";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const imgMenVar = "/img/men";
const imgWomenVar = "/img/women";

const slidesPerView = 3;

const DetailPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [isLike, setIsLike] = useState<boolean>(false);
  const handleClickLike = () => {
    setIsLike((prev) => !prev);
  };
  const maxSlidePage = listImg.length - slidesPerView;

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<any>(null);
  const updateIndex = () => {
    setCurrentSlide(sliderRef.current.swiper.realIndex);
  };

  const slidePrev = () => {
    sliderRef.current.swiper.slidePrev();
  };
  const slideNext = () => {
    sliderRef.current.swiper.slideNext();
  };
  useEffect(() => {
    console.log(currentSlide);
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

  return (
    <div className="min-h-screen bg-white p-2">
      <div className="  grid grid-cols-12 gap-x-8">
        <ProductDetailSlide thumbnail={listImg} />
        <ProductDetailDesc />
      </div>
      <div className="font-semibold text-lg mt-20 space-y-5">
        <h1>Gợi ý phối đồ từ TShop</h1>
        <Swiper
          ref={sliderRef}
          spaceBetween={30}
          slidesPerView={slidesPerView}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          className="h-full w-full !flex"
        >
          {listImg.map((item, idx: number) => {
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

          {currentSlide === 0 ? (
            ""
          ) : (
            <Button
              className="absolute z-50 top-1/2"
              onClick={() => slidePrev()}
            >
              <ArrowLeft size={20} />
            </Button>
          )}

          {currentSlide === maxSlidePage ? (
            ""
          ) : (
            <Button
              className="absolute z-50 top-1/2 right-0"
              onClick={() => slideNext()}
            >
              <ArrowRight size={20} />
            </Button>
          )}

          <div></div>
        </Swiper>
      </div>
    </div>
  );
};

export default DetailPage;

const listImg = [
  {
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    img: `${imgWomenVar}/bottom/E458340-000/vngoods_31_458340.png`,
  },
  {
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    img: `${imgWomenVar}/bottom/E458340-000/vngoods_31_458340.png`,
  },
  {
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
  },
  {
    img: `${imgWomenVar}/bottom/E458340-000/vngoods_31_458340.png`,
  },
];
