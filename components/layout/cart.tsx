import { CartItemProps } from '@/redux/module';
import { remove } from '@/redux/reducer/Cart';
import { getCategoriesThunk } from '@/redux/reducer/Categories';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { formatPrice } from '@/utils';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';

interface CartProps {
    cartItem: CartItemProps;
}
const Cart = ({ cartItem }: CartProps) => {
    const { convertPrice: price } = formatPrice(cartItem.product.price);
    const router = useRouter();
    const [href, setHref] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    useEffect(() => {
        setHref(findHref());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const findHref = () => {
        const cateName = cartItem.product.Sub_Category.Categories[0].name.toLowerCase();
        const href: string = `/store/${cateName}/detail/${cartItem.product.id}`;
        return href;
    };

    const handleClickRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(
            remove({
                product: cartItem.product,
                size: cartItem.size,
                color: cartItem.color,
            }),
        );
    };

    return (
        <Link href={href ? href : ''}>
            <div className="grid md:grid-cols-8 grid-cols-3 bg-white items-center justify-center md:gap-x-4 gap-2 px-4 pb-4 pt-2 xl:max-w-[1300px] mx-auto">
                <Image src={cartItem.product.imageUrl} width="200" height="150" alt={cartItem.product.name} />
                <p className="col-span-2 text-center line-clamp-2">{cartItem.product.name}</p>
                <div className="text-center col-span-1">
                    <p>{price} </p>
                </div>
                <div className="text-center col-span-1">
                    <p>size: {cartItem.size} </p>
                </div>
                <div className="h-7 w-7 mx-auto" style={{ backgroundColor: `#${cartItem.color}` }} />
                <p className="text-center col-end-3 md:col-end-8">{cartItem.qty} cái</p>
                <Button
                    className="md:w-2/3 col-end-4 col-span-1  md:col-end-9"
                    variant="destructive"
                    onClick={(e) => handleClickRemove(e)}
                >
                    <Trash2 size={20} />
                </Button>
            </div>
        </Link>
    );
};

export default Cart;
