import { TextFilterType } from '@/common/type';
import { Combobox } from '@/components/selectBox';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import OrderItems from '@/pages/admin/orders/detail/orderItems';
import { OrderDataProps, OrderItemProps } from '@/redux/module';
import { getOrderAdminByIDThunk } from '@/redux/reducer/Order';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { convertDateUTC7, convertDateDelivery, formatPrice } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface OrderDetailProps {
    token: string;
}
interface dateFormat {
    day: string;
    month: string;
    year: number;
    hours: string;
    minutes: string;
}
const OrderDetail = ({ token }: OrderDetailProps) => {
    const router = useRouter();

    const [date, setDate] = useState<dateFormat | null>(null);
    const [dateDelivery, setDateDelivery] = useState<dateFormat | null>(null);
    const [orderDetail, setOrderDetail] = useState<OrderDataProps | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const { orderId } = router.query;
    const { orderAPI } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderAdminByIDThunk({ orderID: orderId as string }));
        }
    }, [dispatch, orderId]);

    useEffect(() => {
        if (orderAPI) {
            setOrderDetail(orderAPI.data[0]);
        }
    }, [orderAPI]);

    useEffect(() => {
        if (orderAPI) {
            const newDate = new Date(orderAPI.data[0].createdAt);

            const dateFormat = convertDateUTC7(newDate);
            setDate(dateFormat);

            const dateDeliveryFormat = convertDateDelivery(newDate);
            setDateDelivery(dateDeliveryFormat);
        }
    }, [orderAPI]);

    return (
        orderDetail && (
            <div>
                <AdminLayout token={token}>
                    <div className="divide-solid divide-slate-400/80 divide-y space-y-3">
                        <div className="space-y-3 ">
                            <div>
                                <p className="font-bold text-2xl">Order ID: {orderId}</p>
                            </div>
                            <div className="text-sm flex gap-2 divide-solid divide-slate-400/80 divide-x ">
                                <p className=" text-slate-700">
                                    Order date: {date?.day}/{date?.month}/{date?.year} at {date?.hours}:{date?.minutes}
                                </p>
                                <p className="text-primary pl-2">
                                    Estimated delivery: {dateDelivery?.day}/{dateDelivery?.month}/{dateDelivery?.year}
                                </p>
                            </div>
                            <div>
                                <Combobox textFilters={textFilters} />
                            </div>
                        </div>
                        <div className=" grid grid-cols-2 pt-3">
                            <div className="space-y-2">
                                <p className="mb-2">Delivery</p>
                                <div className="ml-2 space-y-1">
                                    <p className="text-gray-500 text-sm">Address</p>
                                    <p> {orderDetail.userAddressAtOrderTime}</p>
                                </div>

                                <div className="ml-2 space-y-1">
                                    <p className="text-gray-500 text-sm">Delivery method</p>
                                    <p> Free ({process.env.NEXT_PUBLIC_DELIVERY_DAYS} days)</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="mb-2">Customer</p>
                                <div className="ml-2 space-y-1">
                                    <p className="text-gray-500 text-sm"></p>
                                    <p className="text-gray-500 text-sm">Name</p>
                                    <p> {orderDetail.userFNameAtOrderTime}</p>
                                </div>
                                <div className="ml-2 space-y-1">
                                    <p className="text-gray-500 text-sm">Phone</p>
                                    <p> {orderDetail.userPhoneAtOrderTime}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-3">
                            <OrderItems orderItems={orderDetail.Order_items} />
                        </div>
                    </div>
                </AdminLayout>
            </div>
        )
    );
};
export default OrderDetail;

const textFilters: TextFilterType[] = [
    {
        label: 'Pending',
    },
    {
        label: 'Cancel',
    },
    {
        label: 'Complete',
    },
    {
        label: 'Hold',
    },
];
