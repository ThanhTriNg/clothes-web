'use client';

import { useTotalItems } from '@/components/hook';
import { formatPrice } from '@/utils';
import { totalCartItemSelector, totalPriceSelector } from '@/redux/reducer/Cart';
import { useAppSelector } from '@/redux/store/Store';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
const CartBtn = () => {
    //   const totalPrices = useAppSelector(totalPriceSelector);
    //   const { convertPrice } = formatPrice(totalPrices);

    const totalItems = useTotalItems();
    return (
        <Link href="/cart" className="relative">
            <ShoppingCart size={30} className="cursor-pointer" />
            {!!totalItems && (
                <div
                    key={totalItems}
                    className="text-white bg-primary rounded-full w-6 text-center absolute -top-2 -right-3 animate-pingOnce "
                >
                    {totalItems}
                </div>
            )}
        </Link>
    );
};

export default CartBtn;
