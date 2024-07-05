import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';

import { CartItemProps, OrderProps, UserProps } from '@/redux/module';
import { createOrderThunk } from '@/redux/reducer/Order';
import { updateUserThunk } from '@/redux/reducer/User';
import { AppDispatch } from '@/redux/store/Store';
import { useDispatch } from 'react-redux';
const checkoutFormSchema = z.object({
    fName: z.string({ required_error: 'required' }).min(0),
    lName: z.string({ required_error: 'required' }).min(0),
    phone: z.string({ required_error: 'required' }).min(0),
    address: z.string({ required_error: 'required' }).min(0),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
interface CheckoutProps {
    className?: string;
    userInfo: UserProps;
    cartItems: CartItemProps[];
}
export default function CheckoutForm({ className, userInfo, cartItems }: CheckoutProps) {
    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            fName: userInfo.fName,
            lName: userInfo.lName,
            phone: userInfo.phone,
            address: userInfo.address,
        },
        mode: 'onSubmit',
    });

    const [orderItems, setOrderItems] = useState<OrderProps[]>();

    useEffect(() => {
        const consolidatedCartItems = new Map();

        cartItems.forEach((item) => {
            const productId = item.product.id;
            const color = item.color;
            const size = item.size;
            consolidatedCartItems.set(
                { productId, color, size },
                {
                    product: {
                        id: item.product.id,
                        name: item.product.name,
                        price: item.product.price,
                        imageUrl: item.product.imageUrl,
                    },
                    quantity: item.qty,
                    color: item.color,
                    size: item.size,
                },
            );
        });
        const outputOrderItems = Array.from(consolidatedCartItems.values());
        setOrderItems(outputOrderItems);
    }, [cartItems]);

    const dispatch = useDispatch<AppDispatch>();
    async function onSubmit(data: CheckoutFormValues) {
        console.log(data);
        try {
            await dispatch(updateUserThunk(data));
            if (orderItems) {
                await dispatch(createOrderThunk(orderItems));
            }
        } catch (error) {}
    }

    return (
        <div className={`${className}`}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                    <div className="grid grid-cols-2 gap-x-10 ">
                        <FormField
                            control={form.control}
                            name="fName"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel className="text-black font-semibold text-sm ">First name</FormLabel>
                                    <FormControl>
                                        <Input
                                            // variant="default"
                                            placeholder="Enter your first name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lName"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel className="text-black font-semibold text-sm">Last name</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input placeholder="Enter your last name" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black font-semibold text-sm">Phone</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your phone"
                                            type="text"
                                            {...field}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                const regex = /^[0-9]+$/;
                                                if (regex.test(inputValue)) {
                                                    field.onChange(inputValue);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black font-semibold text-sm">Address</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input placeholder="Enter your address" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="btn-aware w-full text-white uppercase font-bold rounded-[6px] ">
                        Order
                        <span className={`bg-[#00668F]   !duration-[800ms]`}></span>
                    </Button>
                </form>
            </Form>
        </div>
    );
}
