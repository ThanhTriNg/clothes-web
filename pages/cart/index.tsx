import CartItemCard from '@/components/CartItemCard';
import { useCartItems, useTotalPrices } from '@/components/hook';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils';
import { CartItemProps } from '@/redux/module';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Cart = () => {
    const totalPrice = useTotalPrices();
    const cartItems = useCartItems();
    const { convertPrice } = formatPrice(totalPrice);
    const [sortCartItems, setSortCartItems] = useState<CartItemProps[]>();

    // sort cartItem by id
    useEffect(() => {
        if (cartItems) {
            const sorted = [...cartItems].sort((a, b) => a.product.id - b.product.id);
            setSortCartItems(sorted);
        }
    }, [cartItems]);

    return totalPrice === 0 ? (
        <div className=" min-h-[calc(100vh-96px-96px)] flex items-center justify-center">
            <h1 className="text-2xl text-primary text-center ">Empty!</h1>
        </div>
    ) : (
        <div className="p-2">
            {sortCartItems?.map((item, idx: number) => {
                return <CartItemCard key={`cart-item-${idx}`} cartItem={item} />;
            })}
            <div className="pt-4">
                <p className="text-center text-lg">
                    Total price: <strong className=" text-primary">{convertPrice}</strong>
                </p>
            </div>
            <div className="pt-4 text-center">
                <Button className="">
                    <Link href="/checkout" className="px-4">
                        Order now
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default Cart;
