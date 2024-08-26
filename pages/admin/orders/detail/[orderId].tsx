import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import { OrderInfoProps, OrderItemProps } from '@/redux/module';
import { getOrderAdminByIDThunk } from '@/redux/reducer/Order';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { convertDateUTC7, convertDateDelivery, formatPrice } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface OrderDetailProps {
    token: string;
    orderDetail: OrderItemProps[];
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
    const [orderDetail, setOrderDetail] = useState<OrderInfoProps | null>(null);

    const [totalPrice, setTotalPrice] = useState<string>('0');

    const dispatch = useDispatch<AppDispatch>();

    const { orderId } = router.query;
    const { orderInfo } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderAdminByIDThunk({ orderID: orderId as string }));
        }
    }, [dispatch, orderId]);

    useEffect(() => {
        if (orderInfo) {
            setOrderDetail(orderInfo[0]);
        }
    }, [orderInfo]);

    useEffect(() => {
        if (orderInfo) {
            const newDate = new Date(orderInfo[0].createdAt);

            const dateFormat = convertDateUTC7(newDate);
            setDate(dateFormat);

            const dateDeliveryFormat = convertDateDelivery(newDate);
            setDateDelivery(dateDeliveryFormat);
        }
    }, [orderInfo]);

    //total price
    useEffect(() => {
        if (orderDetail) {
            let totalP = 0;
            orderDetail.Order_items.forEach((item) => {
                const totalPricePerItem = parseInt(item.priceAtOrderTime) * item.quantity;
                totalP += totalPricePerItem;
            });
            const { convertPrice } = formatPrice(totalP);
            setTotalPrice(convertPrice);
        }
    }, [orderDetail]);

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
                            {orderDetail.Order_items.map((item, idx) => {
                                const { convertPrice } = formatPrice(parseInt(item.priceAtOrderTime));
                                return (
                                    <div
                                        key={`orderItemsById-${idx}`}
                                        className="flex items-center justify-between py-2 border-b border-gray-200"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <Image
                                                src={item.imageUrlAtOrderTime}
                                                width="70"
                                                height="70"
                                                alt={item.productNameAtOrderTime}
                                            />
                                            <div className="space-y-2">
                                                <p> {item.productNameAtOrderTime}</p>
                                                <div className="flex items-center gap-2 text-gray-500 divide-solid divide-slate-600 divide-x leading-none">
                                                    <div
                                                        className="h-4 w-4"
                                                        style={{
                                                            backgroundColor: `#${item.colorAtOrderTime}`,
                                                        }}
                                                    />
                                                    <p className="pl-2"> {item.sizeAtOrderTime}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" text-right">
                                            <p className="text-lg font-semibold"> {convertPrice} </p>
                                            <p className="text-gray-500">Qty: {item.quantity} </p>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* <div className="grid grid-cols-2  "> */}
                            <div className="grid justify-end space-y-1 ">
                                <div className="flex justify-end">
                                    <p className="">Subtotal:</p>
                                    <p className="text-right w-44 font-bold">{totalPrice} </p>
                                </div>

                                <div className="flex justify-end">
                                    <p className="">Delivery:</p>
                                    <p className="text-right w-44 font-bold">0</p>
                                </div>

                                <div className="flex justify-end">
                                    <p className=""> Total:</p>
                                    <p className="text-right w-44 font-bold">{totalPrice}</p>
                                </div>
                            </div>

                            {/* </div> */}
                        </div>
                    </div>
                </AdminLayout>
            </div>
        )
    );
};
export default OrderDetail;
