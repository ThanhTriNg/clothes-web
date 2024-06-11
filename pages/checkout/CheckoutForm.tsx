import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';

import { loginThunk, updateUserThunk } from '@/redux/reducer/User';
import { AppDispatch, RootState } from '@/redux/store/Store';
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/components/loading';
import { UserProps } from '@/redux/module';
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
}
export default function CheckoutForm({ className, userInfo }: CheckoutProps) {
    const router = useRouter();
    const [passwordShown, setPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
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
    //   const { errorLogin, successLogin, loading, message } = useSelector(
    //     (state: RootState) => state.users
    //   );
    const dispatch = useDispatch<AppDispatch>();
    async function onSubmit(data: CheckoutFormValues) {
        console.log(data);
        try {
            dispatch(updateUserThunk(data));
        } catch (error) {}
    }
    const [phone, setPhone] = useState('');
    const handlePhoneChange = (event: any) => {
        const inputValue = event.target.value;
        const regex = /^[0-9]+$/;

        if (regex.test(inputValue)) {
            setPhone(inputValue);
        }
    };
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
