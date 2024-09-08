import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormFieldInput, FormFieldRadio } from '@/components/FormFieldCustom';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import { createCateThunk } from '@/redux/reducer/Categories';
import { AppDispatch } from '@/redux/store/Store';
import { useDispatch } from 'react-redux';
const addCateFormSchema = z.object({
    name: z.string().min(1),
    gender: z.enum(['female', 'male', 'both'], {
        required_error: 'You need to select a notification type.',
    }),
});
interface AdminCategoriesProps {
    token: string;
}
type AddCateFormValues = z.infer<typeof addCateFormSchema>;

const LayoutAddOrEdit = ({ token }: AdminCategoriesProps) => {
    const form = useForm<AddCateFormValues>({
        resolver: zodResolver(addCateFormSchema),
        mode: 'onSubmit',
    });
    const dispatch = useDispatch<AppDispatch>();

    async function onSubmit(data: AddCateFormValues) {
        console.log(data);
        try {
            const name = data.name;
            const gender = data.gender;
            await dispatch(createCateThunk({ name, gender }));
        } catch (error) {}
    }

    return (
        <AdminLayout token={token}>
            <div className=" mx-auto">
                <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full space-y-4">
                            <FormFieldInput form={form} name="name" />

                            <FormFieldRadio form={form} name="gender" options={['female', 'male', 'both']} />
                            <Button
                                type="submit"
                                className="btn-aware w-full text-white uppercase font-bold rounded-[6px] "
                            >
                                Create
                                <span className={`bg-[#00668F]   !duration-[800ms]`}></span>
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default LayoutAddOrEdit;
