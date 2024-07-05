import { useCartItems } from '@/components/hook';
import CheckoutForm from '@/pages/checkout/CheckoutForm';
import PopUp from '@/components/popup';
import OrderSummary from '@/pages/checkout/OrderSummary';
import { ClothesPropsData } from '@/redux/module';
import { getUserThunk } from '@/redux/reducer/User';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckFat } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { addOrUpdateCartItemThunk, clearCart } from '@/redux/reducer/Cart';

export interface summaryCart {
    product: ClothesPropsData;
    qty: string;
}

const Checkout = () => {
    const router = useRouter();
    const cartItems = useCartItems();
    const { userInfo } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    const [summaryCart, setSummaryCart] = useState<summaryCart[]>();

    useEffect(() => {
        if (cartItems.length === 0) {
            router.push('/');
        }
    }, [cartItems, router]);

    useEffect(() => {
        dispatch(getUserThunk());
    }, [dispatch]);

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
    const { errorOrder, successOrder } = useSelector((state: RootState) => state.orders);

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (successOrder) {
            setShowPopup(true);
        }
    }, [successOrder]);
    const handleClosePopup = async () => {
        setShowPopup(false);
        dispatch(clearCart());
        await dispatch(addOrUpdateCartItemThunk(cartItems));
        router.push('/');
    };
    
    return (
        summaryCart &&
        userInfo && (
            <div>
                <p className="text-center text-2xl font-bold text-tertiary-foreground mb-6">Checkout</p>
                <div className="grid grid-cols-5 gap-x-10">
                    <CheckoutForm className="col-span-3" userInfo={userInfo} cartItems={cartItems} />
                    <OrderSummary className="col-span-2" summaryCart={summaryCart} />
                </div>

                <PopUp
                    icon={CheckFat}
                    colorIcon="green"
                    sizeIcon={32}
                    title="Thank you"
                    message="Your order is confirmed"
                    description={`We will sending you an email confirm to ${userInfo.email} shortly`}
                    isOpen={showPopup}
                    onClose={handleClosePopup}
                />
            </div>
        )
    );
};

export default Checkout;
