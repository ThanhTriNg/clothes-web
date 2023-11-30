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
import { useDispatch, useSelector } from "react-redux";
import { getClothesByIdThunk, getClothesThunk } from "@/redux/reducer/Clothes";
import { getCategoriesThunk } from "@/redux/reducer/Categories";
import { RootState, AppDispatch } from "@/redux/store/Store";
import { Divide } from "lucide-react";
import Link from "next/link";
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
    dispatch(getClothesThunk());
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
        <div className="  grid grid-cols-12 gap-x-8">
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
                        width="0"
                        height="0"
                        sizes="100vw"
                        alt="Banner"
                        className="w-full h-full rounded"
                      />
                    </Link>
                  </SwiperSlide>
                )
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

            {maxSlidePage && currentSlide === maxSlidePage ? (
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
