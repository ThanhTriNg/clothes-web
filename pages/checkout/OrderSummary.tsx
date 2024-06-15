import { useTotalPrices } from '@/components/hook';
import { formatPrice } from '@/utils';
import { summaryCart } from '@/pages/checkout';
import Image from 'next/image';

interface OrderSummaryProps {
    className?: string;
    summaryCart: summaryCart[];
}
const OrderSummary = ({ className, summaryCart }: OrderSummaryProps) => {
    const totalPrice = useTotalPrices();
    const { convertPrice: totalPriceF } = formatPrice(totalPrice);
    console.log(totalPriceF);
    return (
        <div className={`${className}`}>
            <div className="text-lg font-bold text-center">Order Summary</div>
            <div className="">
                {summaryCart.map((item, idx: number) => {
                    const { convertPrice: itemPrice } = formatPrice(item.product.price);
                    const { convertPrice: totalItemPrice } = formatPrice(item.product.price * parseInt(item.qty));

                    return (
                        <div key={`summaryCart${idx}`} className="">
                            {idx !== 0 && <hr className="border-t-2 border-solid border-black/30 my-2" />}
                            <div className="grid grid-cols-2 items-center justify-center text-center gap-3">
                                <Image
                                    src={item.product.imageUrl}
                                    width="100"
                                    height="50"
                                    alt={item.product.name}
                                    className="mx-auto"
                                />

                                <div className="has-tooltip">
                                    <span className="tooltip rounded shadow-lg p-1 text-white bg-black -mt-8">
                                        {item.product.name}
                                    </span>
                                    <p className="truncate-2">{item.product.name} </p>
                                </div>

                                <div className="flex justify-center items-center col-span-1">
                                    <p>
                                        {itemPrice} x {item.qty} =
                                    </p>
                                </div>
                                <div className="flex justify-center items-center col-span-1">
                                    <p>{totalItemPrice}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="grid grid-cols-2 text-center mt-4">
                    <div className=" font-bold">Total price:</div>
                    <div className=" font-bold">{totalPriceF}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
