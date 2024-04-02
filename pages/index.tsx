import LimitedPromotion from "@/components/LimitedPromotion";
import OutStanding from "@/components/OutStanding";
import SlideShow from "@/components/swiper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const imgMenVar = "/img/men";
export const imgWomenVar = "/img/women";

export default function HomePage() {
  return (
    <div className="">
      <div className="space-y-5">
        <div className="grid grid-cols-12 space-x-2">
          <SlideShow className="col-span-8 " listImg={listImg} />
          <div className="col-span-4 space-y-2">
            {listImgRight.map((img: string, idx: number) => (
              <Image
                key={`img-right-${idx}`}
                src={img}
                width="0"
                height="0"
                sizes="100vw"
                alt="Banner"
                className="w-full h-[calc(50% -4px)] rounded"
              />
            ))}
          </div>
        </div>

        <div className="grid xl:grid-cols-8 grid-cols-4 xl:gap-x-10 gap-4 bg-white p-3 rounded items-center ">
          {listImgIcon.map((item, idx) => (
            <Link
              key={`icon-${idx}`}
              href={item.href}
              className="col-span-1 transition-all duration-75 hover:-translate-y-0.5 translate-y-0"
            >
              <div className="flex flex-col items-center  space-y-2">
                <Image
                  src={item.img}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt=""
                  className="w-[45px] h-[45px] "
                />
                <p className="text-xs text-center "> {item.title} </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-12 md:gap-x-8 bg-white p-3 rounded items-center gap-y-4 md:gap-y-0 ">
          {listTab.map((title: string, idx: number) => {
            return (
              <div
                className="md:col-span-6 col-span-12 space-y-2"
                key={`tab-${idx}`}
              >
                <div className="flex justify-between items-center px-10">
                  <p className="uppercase font-medium text-base">{title}</p>
                  <Button variant="link" className="text-xs">
                    Xem thêm
                  </Button>
                </div>
                <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                  {listDeal.map((item, idx) => {
                    const { convertPrice, convertPriceDiscount } = formatPrice(
                      item.price,
                      item.discount
                    );

                    return (
                      <div
                        className="col-span-1 mx-auto transition-all hover:scale-105"
                        key={`deal-${idx}`}
                      >
                        <Link href="/store/tops" className="">
                          <div className="relative">
                            <p className="text-xs font-bold text-primary absolute p-2 rounded-s-sm bg-primary-foreground right-[10%]">
                              -{item.discount}%
                            </p>
                            <Image
                              src={item.img}
                              width="300"
                              height="300"
                              sizes="(max-width: 640px) 40vw, 20vw"

                              alt={`${idx}`}
                              // className="w-[160px] h-[160px]"
                              // className="xl:w-4/5 xl:h-auto md:w-auto md:h-[200px] w-full h-full  mx-auto"

                            />
                          </div>
                          <div className="md:mt-2 xl:mt-0 my-auto mx-2 rounded-sm">
                            <p className="text-black/50 font-bold text-center text-xs line-through md:text-sm">
                              {convertPrice}
                            </p>
                            <p className="text-center text-primary text-sm md:text-base">
                              {convertPriceDiscount}
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="md:w-1/2 w-full mx-auto bg-primary xl:py-10 sm:py-6 py-4 rounded text-white">
          <div className="text-center space-y-3 ">
            <h1 className="xl:text-4xl text-2xl font-bold uppercase">Giá mới hấp dẫn</h1>
            <h1 className="xl:text-xl text-base font-semibold">Số lượng có hạn</h1>
            <p className="text-base font-medium">
              Mua sắm online tiện lợi và nhận hàng tại cửa hàng gần bạn
            </p>
          </div>
        </div>

        <OutStanding />
        <LimitedPromotion />
      </div>
    </div>
  );
}

const listImg = ["/img/banner-1.jpg", "/img/banner-2.jpg"];
const listImgRight = ["/img/banner-3.jpg", "/img/banner-4.jpg"];
const listImgIcon = [
  {
    href: "/",
    img: "/img/flash.png",
    title: "Khung giờ săn sale",
  },
  {
    href: "/",
    img: "/img/free-ship.png",
    title: "Miễn phí ship",
  },
  {
    href: "/",
    img: "/img/voucher-xtra.png",
    title: "Voucher giảm dên 500.000Đ",
  },
  {
    href: "/",
    img: "/img/cheap.png",
    title: "Gì cũng rẻ",
  },
  {
    href: "/",
    img: "/img/coupon.png",
    title: "Mã giảm giá",
  },
  {
    href: "/",
    img: "/img/outlet.png",
    title: "Hàng hiệu outlet",
  },
  {
    href: "/",
    img: "/img/world.png",
    title: "Quốc tế - Deal đồng giá",
  },
  {
    href: "/",
    img: "/img/percent.png",
    title: "Bắt trend giá sốc",
  },
];

const listTab = ["Deal cho bạn", "Hàng hiệu giá tốt"];

const listDeal = [
  {
    href: "/",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 500000,
    discount: 24,
  },
  {
    href: "/",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 400000,
    discount: 80,
  },
  {
    href: "/",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 400000,
    discount: 1,
  },  {
    href: "/",
    img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    price: 1150000,
    discount: 90,
  },
];

export const formatPrice = (price: number, discount: number = 0) => {
  const discountP: number = discount / 100;
  const priceDiscount: number = price * (1 - discountP);

  const convertPrice: string = price.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  const convertPriceDiscount: string = priceDiscount.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return { convertPrice, convertPriceDiscount };
};
