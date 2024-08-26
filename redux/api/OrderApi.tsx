import { OrderProps, ParamsProps } from '@/redux/module';
import AxiosClient from './AxiosClient';
import Cookies from 'js-cookie';

const OrderApi = {
    getOrderAdmin: (params?: any) => {
        const token = Cookies.get('token');
        const config = {
            params: { ...params },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        return AxiosClient.get('/order/admin', config);
    },
    // getOrderItemsAdminById: (orderId: number) => {
    //     const token = Cookies.get('token');
    //     return AxiosClient.get(`/order/admin/${orderId}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
    // },

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
