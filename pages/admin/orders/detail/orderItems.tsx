import { OrderItemProps } from '@/redux/module';
import { formatPrice } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface OrderItemsPageProps {
    orderItems: OrderItemProps[];
}

const OrderItems = ({ orderItems }: OrderItemsPageProps) => {
    const [totalPrice, setTotalPrice] = useState<string>('0');

    //total price
    useEffect(() => {
        const totalPrice = orderItems.reduce((acc, item) => {
            const totalPricePerItem = parseInt(item.priceAtOrderTime) * item.quantity;
            return acc + totalPricePerItem;
        }, 0);
        const { convertPrice } = formatPrice(totalPrice);
        setTotalPrice(convertPrice);
    }, [orderItems]);

    return (
        <div>
            {orderItems.map((item, idx) => {
                const { convertPrice } = formatPrice(parseInt(item.priceAtOrderTime));

                const { convertPrice: pricePerItem } = formatPrice(parseInt(item.priceAtOrderTime) * item.quantity);
                return (
                    <div
                        key={`orderItemsById-${idx}`}
                        className="flex items-center justify-between py-4 border-b border-gray-200"
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
                            <div>
                                <p className="text-lg font-semibold border-t border-solid"> {pricePerItem} </p>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className="grid justify-end space-y-1 ">
                <div className="border-solid border-t pt-2">
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
            </div>
        </div>
    );
};

export default OrderItems;
