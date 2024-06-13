import { OrderProps } from '@/redux/module';
import AxiosClient from './AxiosClient';
import Cookies from 'js-cookie';

const OrderApi = {
    getOrder: () => {
        const token = Cookies.get('token');
        return AxiosClient.get('/order', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    createOrder: (orderItems: OrderProps[]) => {
        const token = Cookies.get('token');
        return AxiosClient.post('/order', orderItems, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};

export default OrderApi;
