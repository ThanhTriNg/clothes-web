'use client';

import QtyBtn from '@/components/QtyBtn';
import { useProductQtyInCart } from '@/components/hook';
import { Button } from '@/components/ui/button';
import { CartItem, ClothesPropsData } from '@/redux/module';
import { decrement, increment } from '@/redux/reducer/Cart';
import { useAppDispatch } from '@/redux/store/Store';

interface AddToBtnProps {
    product: ClothesPropsData;
    size: string;
    color: string;
}

export const updatedCartItems = (cartItems: CartItem[]) => {
    return cartItems.map((item) => {
        const { product, qty, ...rest } = item;
        const { id } = product;
        return {
            product: { id },
            quantity: qty,
            ...rest,
        };
    });
};
const AddToCartBtn = ({ product, size, color }: AddToBtnProps) => {
    const dispatch = useAppDispatch();

    // const qty = useAppSelector((state) => {
    //     return productQtyInCartSelector(state, product.id, size, color);
    // });

    const qty = useProductQtyInCart(product.id, size, color);
    const handleIncrement = () => {
        dispatch(increment({ product, size, color }));
    };

    const handleDecrement = () => {
        dispatch(decrement({ product, size, color }));
    };

    if (!qty)
        return (
            <div>
                <Button className="uppercase w-full" onClick={handleIncrement}>
                    Add to cart
                </Button>
            </div>
        );

    return <QtyBtn onIncrease={handleIncrement} onDecrease={handleDecrement} qty={qty} />;
};

export default AddToCartBtn;
