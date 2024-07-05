import { UserAuthProps, UserProps } from '../module';
import AxiosClient from './AxiosClient';
import Cookies from 'js-cookie';

const CartApi = {
    getCart: () => {
        const token = Cookies.get('token');
        return AxiosClient.get('/cart', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    addCartItem: (cartItem: any) => {
        const token = Cookies.get('token');
        return AxiosClient.post('/cart/addItem', cartItem, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};

export default CartApi;
