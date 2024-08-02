import ProductDetailDesc from '@/components/ProductDetailDesc';
import ProductDetailSlide from '@/components/ProductDetailSlide';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import Error from 'next/error';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { getClothesByIdThunk, getClothesThunk } from '@/redux/reducer/Clothes';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


const slidesPerView = 3;

const DetailPage = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { category: slugCateName, productId } = router.query;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLike, setIsLike] = useState<boolean>(false);
    const [maxSlidePage, setMaxSlidePage] = useState<number>();
    const [isRightSlug, setIsRightSlug] = useState<boolean>(false);
    const { clothesInfo, clothesById, clothesByIdLoading } = useSelector((state: RootState) => state.clothes);
    useEffect(() => {
        if (slugCateName && typeof slugCateName === 'string' && clothesById) {
            setIsRightSlug(fnIsRightSlug(slugCateName));
        } else {
            setIsRightSlug(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clothesById, slugCateName]);

    useEffect(() => {
        dispatch(getClothesThunk({ sortValue: '0', page: 1 }));

        if (typeof productId === 'string') {
            dispatch(getClothesByIdThunk(productId));
        }
    }, [dispatch, productId]);
    useEffect(() => {
        if (clothesInfo) {
            setMaxSlidePage(clothesInfo.data.length - 1 - slidesPerView);
        }
    }, [clothesInfo]);
    const sliderRef = useRef<any>(null);

    useEffect(() => {
        setCurrentSlide(0);
        if (clothesById && clothesInfo) sliderRef.current.swiper.slideTo(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    useEffect(() => {
        if (isRightSlug && clothesById && clothesInfo && sliderRef.current) {
            const swiperInstance = sliderRef.current.swiper;
            if (swiperInstance) {
                swiperInstance.on('slideChange', updateIndex);
            }

            return () => {
                if (swiperInstance) {
                    swiperInstance.off('slideChange', updateIndex);
                }
            };
        }
    }, [clothesById, clothesInfo, isRightSlug]);
    const updateIndex = () => {
        console.log(sliderRef);
        setCurrentSlide(sliderRef.current.swiper.realIndex);
    };
    const slidePrev = () => {
        sliderRef.current.swiper.slidePrev();
    };

    const slideNext = () => {
        sliderRef.current.swiper.slideNext();
    };
    const handleClickLike = () => {
        setIsLike((prev) => !prev);
    };

    const fnIsRightSlug = (slugCateName: string) => {
        return clothesById?.Sub_Category.Categories[0].name.toLowerCase() === slugCateName.toLowerCase();
    };
    return clothesByIdLoading ? (
        <div className="flex justify-center items-center min-h-[85vh] ">
            <Loading />
        </div>
    ) : isRightSlug ? (
        clothesById &&
        clothesInfo && (
            <div className="min-h-screen bg-white p-2">
                <div className="grid grid-cols-12 md:gap-x-8 gap-x-2">
                    <ProductDetailSlide
                        description={clothesById.description}
                        thumbnail={{
                            imageUrl: clothesById.imageUrl,
                            subImageUrls: JSON.parse(clothesById.subImageUrls),
                        }}
                    />
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
                        {clothesInfo.data.map((item, idx: number) => {
                            const cateName = item.Sub_Category.Categories[0].name.toLowerCase();
                            const href = `/store/${cateName}/detail/${item.id}`;
                            const currentProduct = item.id.toString() === productId;
                            return (
                                !currentProduct && (
                                    <SwiperSlide key={`slide-${idx}`} className="h-full">
                                        <Link href={href}>
                                            <Image
                                                src={item.imageUrl}
                                                width="450"
                                                height="450"
                                                sizes="33vw"
                                                className="w-[450px] h-[450px]"
                                                alt="Banner"
                                            />
                                        </Link>
                                    </SwiperSlide>
                                )
                            );
                        })}

                        {currentSlide === 0 ? (
                            ''
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
                            ''
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
    ) : (
        <Error statusCode={404} />
    );
};

export default DetailPage;

// const listImg = [
//   {
//     img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
//   },
//   {
//     img: `${imgWomenVar}/bottom/E458340-000/vngoods_31_458340.png`,
//   },
//   {
//     img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
//   },
//   {
//     img: `${imgWomenVar}/bottom/E458340-000/vngoods_31_458340.png`,
//   },
//   {
//     img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
//   },
//   {
//     img: `${imgWomenVar}/bottom/E458340-000/vngoods_31_458340.png`,
//   },
// ];
