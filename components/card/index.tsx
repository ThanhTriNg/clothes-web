import { JSONparse, formatPrice } from '@/utils';
import { Heart } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PickColor from '../pickColor';

import { CategoriesProps, ClothesPropsData } from '@/redux/module';
import { useRouter } from 'next/router';
import { convertNameCate } from '../LimitedPromotion';
interface CardProps extends ClothesPropsData {
    link?: string | undefined;
    categoriesInfo?: CategoriesProps[];
}

const Card = ({ id, imageUrl, name, price, colors, Sub_Category, link, categoriesInfo }: CardProps) => {
    const { convertPrice } = formatPrice(price);
    const [isLike, setIsLike] = useState<boolean>(false);
    const [subCateName, setSubCateName] = useState<string>();

    const handleClickLike = () => {
        setIsLike((prev) => !prev);
    };
    const router = useRouter();
    const { category } = router.query;

    const getCategoryNameById = (subCategoryId: number) => {
        const cate = categoriesInfo?.find((item) => item.id === subCategoryId);
        return cate?.name;
    };

    //get name of categories
    useEffect(() => {
        setSubCateName(Sub_Category?.Categories[0].name.toLowerCase());
    }, [Sub_Category?.Categories]);

    // useEffect(() => {
    //   if (subCategoryId) {
    //     const cateName = getCategoryNameById(subCategoryId);
    //     if (cateName) {
    //       setSubCateName(convertNameCate(cateName));
    //     }
    //   }
    // }, [subCategoryId]);

    let href = '';
    if (link) {
        href = `/${link}/detail/${id}`;
    } else if (category) {
        href = `/store/${category}/detail/${id}`;
    } else {
        href = `/store/${subCateName}/detail/${id}`;
    }
    return (
        <div className="relative col-span-1 transition-all hover:scale-105 cursor-pointer select-none">
            {isLike ? (
                <Heart
                    className="absolute top-[5%] right-[5%]"
                    size={30}
                    weight="fill"
                    color="red"
                    onClick={() => handleClickLike()}
                />
            ) : (
                <Heart
                    className="absolute top-[5%] right-[5%]"
                    size={30}
                    color="black"
                    onClick={() => handleClickLike()}
                />
            )}
            <Link href={href} className="space-y-4">
                <Image
                    // src={img.main}
                    src={imageUrl}
                    // width="0"
                    // height="0"
                    // sizes="100vw"
                    // alt=""
                    // className="w-full h-auto !mt-0"
                    width="300"
                    height="300"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    alt="Image"
                />

                {colors && <PickColor colors={JSONparse(colors)} />}

                <p className={`truncate-2  font-semibold text-base h-[3rem]`}>{name}</p>
                <p className={`truncate-2  font-bold text-primary`}>{convertPrice}</p>
            </Link>
        </div>
    );
};

export default Card;
