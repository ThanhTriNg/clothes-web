import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useEffect, useRef, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductDetailSlideProps } from '@/common/type';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Rating } from 'react-simple-star-rating';
import 'swiper/css';
import 'swiper/css/pagination';

const ProductDetailSlide = ({ thumbnail, description }: ProductDetailSlideProps) => {
    const router = useRouter();

    const [rating, setRating] = useState<number>();
    const [convertThumbnail, setConvertThumbnail] = useState<string[]>();
    const [currentSlide, setCurrentSlide] = useState(0);

    const { productId } = router.query;
    const sliderRef = useRef<any>(null);
    useEffect(() => {
        if (thumbnail) {
            setConvertThumbnail([thumbnail.imageUrl, ...(thumbnail.subImageUrls ?? [])]);
        }
    }, [thumbnail]);

    useEffect(() => {
        setCurrentSlide(0);
        if (convertThumbnail) sliderRef.current.swiper.slideTo(0);
    }, [productId]);

    useEffect(() => {
        if (convertThumbnail) {
            const swiperInstance = sliderRef.current.swiper;

            swiperInstance.slideTo(currentSlide, 500, false);
        }
    }, [currentSlide, convertThumbnail]);

    useEffect(() => {
        if (convertThumbnail) {
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
    }, [convertThumbnail]);

    const updateIndex = () => {
        setCurrentSlide(sliderRef.current.swiper.realIndex);
    };

    const slideTo = (idx: number) => {
        setCurrentSlide(idx);
    };

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    const subOverview = [
        'Vải thoáng mát với Kết cấu mềm mại.',
        'Công nghệ DRY và cool Touch.',
        'vải tạo ra một Kiểu dáng đẹp.',
    ];

    const subMaterial = 'Thân: 73% Bông, 27% Polyeste/ Bo: 82% Bông, 15% Polyeste, 3% Elastan';
    // const formattedDescription = description.replace(/\\n/g, "\n");

    const desc = [
        {
            title: 'Overview',
            // sub: subOverview,
            sub: description,
        },
        {
            title: 'Metarial',
            sub: subMaterial,
        },
    ];
    // console.log(JSON.parse(description));
    return (
        convertThumbnail && (
            <div className="col-span-full md:col-span-7 grid grid-cols-7 h-fit">
                {/* thumbnail */}
                <div className="col-span-2 grid grid-cols-2 gap-0 mr-2 h-fit">
                    {convertThumbnail.map((item, idx: number) => {
                        return (
                            <div
                                key={idx}
                                className={`col-span-1 cursor-pointer transition-all ${
                                    currentSlide === idx ? `p-1 border border-black border-solid` : `p-2`
                                }`}
                                onClick={() => slideTo(idx)}
                            >
                                <Image
                                    src={item}
                                    width="100"
                                    height="100"
                                    alt="Banner"
                                    className="w-[85px] h-[85px] mx-auto"
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
                        {convertThumbnail.map((item, idx: number) => {
                            return (
                                <SwiperSlide key={`slide-${idx}`} className="h-full">
                                    <Image
                                        src={item}
                                        width="500"
                                        height="500"
                                        sizes="100vw"
                                        alt="Banner"
                                        className="w-[500px] h-[500px] rounded"
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                <div className="my-4 md:my-12 space-y-4 md:space-y-8 col-span-full">
                    <div className="">
                        <h1 className="uppercase font-bold md:text-2xl text-base">DESCRIPTION</h1>
                        <Accordion type="multiple" className="ml-4">
                            {desc.map((item, idx: number) => {
                                const sub = item.sub?.trim();
                                return (
                                    <div key={`desc-${idx}`}>
                                        <AccordionItem value={`item-${idx}`}>
                                            <AccordionTrigger className="text-lg">{item.title}</AccordionTrigger>
                                            <AccordionContent className="space-y-2 ml-2">
                                                <ul>
                                                    {sub?.split('\n').map((line, index) => (
                                                        <li className="list-disc list-inside " key={index}>
                                                            {line}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </div>
                                );
                            })}
                        </Accordion>
                    </div>
                    <div>
                        <div className="flex gap-x-4">
                            <h1 className="uppercase font-bold md:text-2xl text-base">Đánh giá</h1>
                            <Rating
                                size={20}
                                emptyStyle={{ display: 'flex' }}
                                fillStyle={{ display: '-webkit-inline-box' }}
                                onClick={handleRating}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
export default ProductDetailSlide;
