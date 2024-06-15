import { useCartItems } from '@/components/hook';
import CheckoutForm from '@/pages/checkout/CheckoutForm';
import OrderSummary from '@/pages/checkout/OrderSummary';
import { ClothesPropsData } from '@/redux/module';
import { getUserThunk } from '@/redux/reducer/User';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface summaryCart {
    product: ClothesPropsData;
    qty: string;
}

const Checkout = () => {
    const cartItems = useCartItems();
    const { userInfo } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getUserThunk());
    }, [dispatch]);
    const [summaryCart, setSummaryCart] = useState<summaryCart[]>();

    useEffect(() => {
        const consolidatedCartItems = new Map();
        cartItems.forEach((item) => {
            const productId = item.product.id;
            const existingItem = consolidatedCartItems.get(productId);
            if (existingItem) {
                existingItem.qty += item.qty;
            } else {
                consolidatedCartItems.set(productId, {
                    product: item.product,
                    qty: item.qty,
                });
            }
        });
        const outputCartItems = Array.from(consolidatedCartItems.values());
        setSummaryCart(outputCartItems);
    }, [cartItems]);

    return (
        summaryCart &&
        userInfo && (
            <div>
                <p className="text-center text-2xl font-bold text-tertiary-foreground mb-6">Checkout</p>
                <div className="grid grid-cols-5 gap-x-10">
                    <CheckoutForm className="col-span-3" userInfo={userInfo} cartItems={cartItems} />
                    <OrderSummary className="col-span-2" summaryCart={summaryCart} />
                </div>
            </div>
        )
    );
};

export default Checkout;
