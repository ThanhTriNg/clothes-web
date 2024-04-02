import ProductDetailDesc from "@/components/ProductDetailDesc";
import ProductDetailSlide from "@/components/ProductDetailSlide";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { getClothesByIdThunk, getClothesThunk } from "@/redux/reducer/Clothes";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const imgMenVar = "/img/men";
const imgWomenVar = "/img/women";

const slidesPerView = 3;

const DetailPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { productId } = router.query;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [maxSlidePage, setMaxSlidePage] = useState<number>();

  const { clothesInfo, clothesById } = useSelector(
    (state: RootState) => state.clothes
  );

  useEffect(() => {
    dispatch(getClothesThunk("0"));
    if (typeof productId === "string") {
      dispatch(getClothesByIdThunk(productId));
    }
  }, [dispatch, productId]);
  useEffect(() => {
    if (clothesInfo) {
      setMaxSlidePage(clothesInfo.length - 1 - slidesPerView);
    }
  }, [clothesInfo]);
  const sliderRef = useRef<any>(null);
  const updateIndex = () => {
    setCurrentSlide(sliderRef.current.swiper.realIndex);
  };
  useEffect(() => {
    setCurrentSlide(0);
    if (clothesById && clothesInfo) sliderRef.current.swiper.slideTo(0);
  }, [productId]);

  useEffect(() => {
    if (clothesById && clothesInfo) {
      const swiperInstance = sliderRef.current.swiper;

      if (swiperInstance) {
        swiperInstance.on("slideChange", updateIndex);
      }

      return () => {
        if (swiperInstance) {
          swiperInstance.off("slideChange", updateIndex);
        }
      };
    }
  }, [clothesById, clothesInfo]);
  const slidePrev = () => {
    sliderRef.current.swiper.slidePrev();
  };
  const slideNext = () => {
    sliderRef.current.swiper.slideNext();
  };
  const handleClickLike = () => {
    setIsLike((prev) => !prev);
  };
  return (
    clothesById &&
    clothesInfo && (
      <div className="min-h-screen bg-white p-2">
        <div className="grid grid-cols-12 md:gap-x-8 gap-x-2">
          <ProductDetailSlide thumbnail={clothesById?.img} />
          <ProductDetailDesc clothes={clothesById} />
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
            {clothesInfo.map((item, idx: number) => {
              const img = item.img.main;
              const href = `/store/tops/detail/${item.id}`;
              const currentProduct = item.id.toString() === productId;
              // console.log(item.id, productId);
              return (
                !currentProduct && (
                  <SwiperSlide key={`slide-${idx}`} className="h-full">
                    <Link href={href}>
                      <Image
                        src={img}
                        width="450"
                        height="450"
                        sizes="33vw"
                        alt="Banner"
                      />
                    </Link>
                  </SwiperSlide>
                )
              );
            })}

            {currentSlide === 0 ? (
              ""
            ) : (
              //Arrow Left
              <Button
                size="sm"
                className="absolute z-50 top-1/2 -translate-y-1/2 left-0"
                onClick={() => slidePrev()}
              >
                <ArrowLeft className="text-base md:text-xl" />
              </Button>
            )}

            {maxSlidePage && currentSlide === maxSlidePage ? (
              ""
            ) : (
              //Arrow Right
              <Button
                size="sm"
                className="absolute z-50 top-1/2 -translate-y-1/2 right-0"
                onClick={() => slideNext()}
              >
                <ArrowRight className="text-base md:text-xl" />
              </Button>
            )}

            <div></div>
          </Swiper>
        </div>
      </div>
    )
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
