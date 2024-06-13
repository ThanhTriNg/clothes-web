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
import { obscureEmail } from '@/helpers';
const userFormSchema = z.object({
    fName: z.string({ required_error: 'required' }).min(0),
    lName: z.string({ required_error: 'required' }).min(0),
    phone: z.string({ required_error: 'required' }).min(0),
    address: z.string({ required_error: 'required' }).min(0),
    email: z.string({ required_error: 'required' }).min(0),
});

type UserFormValues = z.infer<typeof userFormSchema>;
interface UserFormProps {
    className?: string;
    userInfo: UserProps;
}

export default function UserForm({ className, userInfo }: UserFormProps) {
    const obEmail = obscureEmail(userInfo.email);
    const router = useRouter();
    const form = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            fName: userInfo.fName,
            lName: userInfo.lName,
            phone: userInfo.phone,
            address: userInfo.address,
            email: userInfo.email,
        },
        mode: 'onSubmit',
    });

    const [isFormChanged, setIsFormChanged] = useState(false);
    const currentValues = form.watch();

    //check form changed
    useEffect(() => {
        const checkIfFormChanged = () => {
            const isChanged = (Object.keys(currentValues) as (keyof UserFormValues)[]).some(
                (key) => currentValues[key] !== userInfo[key],
            );
            setIsFormChanged(isChanged);
        };

        checkIfFormChanged();
    }, [currentValues, userInfo]);

    const dispatch = useDispatch<AppDispatch>();
    async function onSubmit(data: UserFormValues) {
        console.log(data);
        try {
            await dispatch(updateUserThunk(data));
            window.location.reload();
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
                                        <Input {...field} />
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
                                            <Input {...field} />
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
                                        <Input {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black font-semibold text-sm">Email</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input disabled value={obEmail} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={!isFormChanged}
                        className="btn-aware w-40 text-white uppercase font-bold rounded-[6px] select-none"
                    >
                        Save changes
                    </Button>
                </form>
            </Form>
        </div>
    );
}
