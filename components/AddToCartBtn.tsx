'use client';

import QtyBtn from '@/components/QtyBtn';
import { Button } from '@/components/ui/button';
import { CartItem, ClothesPropsData } from '@/redux/module';
import { addCartItemThunk, decrement, increment, productQtyInCartSelector } from '@/redux/reducer/Cart';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store/Store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
    const { cartItems } = useSelector((state: RootState) => state.cartPersistedReducer);

    const qty = useAppSelector((state) => {
        return productQtyInCartSelector(state, product.id, size, color);
    });

    const handleIncrement = () => {
        dispatch(increment({ product, size, color }));
    };

    const handleDecrement = () => {
        dispatch(decrement({ product, size, color }));
    };

    // useEffect(() => {
    //     const debounceTime = 300;
    //     const timer = setTimeout(() => {
    //         const update = updatedCartItems(cartItems);
    //         dispatch(addCartItemThunk(update));
    //     }, debounceTime);

    //     return () => clearTimeout(timer);
    // }, [cartItems, dispatch]);

    if (!qty)
        return (
            <div>
                {/* <button>Add to cart</button> */}
                <Button className="uppercase w-full" onClick={handleIncrement}>
                    Add to cart
                </Button>
            </div>
        );

    return (
        <QtyBtn
            // onIncrease={() => dispatch(increment({ product, size, color }))}
            // onDecrease={() => dispatch(decrement({ product, size, color }))}
            onIncrease={handleIncrement}
            onDecrease={handleDecrement}
            qty={qty}
        />
    );
};

export default AddToCartBtn;
