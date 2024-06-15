import { productQtyInCartSelector, totalCartItemSelector, totalPriceSelector } from '@/redux/reducer/Cart';
import { useAppSelector } from '@/redux/store/Store';

export const useCartItems = () => {
    return useAppSelector((state) => state.cartPersistedReducer.cartItems);
};

export const useTotalItems = () => {
    return useAppSelector(totalCartItemSelector);
};

export const useTotalPrices = () => {
    return useAppSelector(totalPriceSelector);
};

export const useProductQtyInCart = (productId: number, size: string, color: string) => {
    return useAppSelector((state) => productQtyInCartSelector(state, productId, size, color));
};
