import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { FormFieldArena, FormFieldInput } from '@/components/FormFieldCustom';
import Loading from '@/components/loading';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import { SubCateProps } from '@/redux/module';
import { getCategoriesThunk, getSubCateByCateIdThunk } from '@/redux/reducer/Categories';
import { editClothesThunk, getClothesByIdThunk } from '@/redux/reducer/Clothes';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ProductImage from '@/pages/admin/clothes/add/ProductImage';
import Image from 'next/image';
import ProductGallery from '@/pages/admin/clothes/add/ProductGallery';
import { JSONparse } from '@/utils';
import { getProductImage, getProductGallery } from '@/redux/reducer/Media';

const addCateFormSchema = z.object({
    name: z.string().min(1),
    price: z.string().min(1),
    imageUrl: z.any(),
    subImageUrls: z.any(),
    description: z
        .string()
        .min(10, {
            message: 'Description must be at least 10 characters.',
        })
        .max(500, {
            message: 'Description must not be longer than 500 characters.',
        }),
    descriptionSort: z
        .string()
        .min(10, {
            message: 'Description must be at least 10 characters.',
        })
        .max(150, {
            message: 'Description must not be longer than 150 characters.',
        }),
    subCategoryId: z.string(),
    // sizes: z.string().min(1),
    // colors: z.string().min(1),
    // gender: z.string().min(1),
    // stock: z.string().min(1),
});
type AddCateFormValues = z.infer<typeof addCateFormSchema>;
interface AdminClothesProps {
    token: string;
}

interface SubImgArrProps {
    url: string;
}
const AdminClothesAdd = ({ token }: AdminClothesProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const { clothesById, successEdit, errorEdit, loading } = useSelector((state: RootState) => state.clothes);
    const { saveProductImage, saveProductGallery } = useSelector((state: RootState) => state.media);

    const router = useRouter();
    const { productId } = router.query;

    const form = useForm<AddCateFormValues>({
        resolver: zodResolver(addCateFormSchema),
        defaultValues: {
            name: '',
            price: '',
        },
        mode: 'onSubmit',
    });

    useEffect(() => {
        if (productId && typeof productId === 'string') {
            dispatch(getClothesByIdThunk(productId));
        }
    }, [dispatch, productId]);
    const [subImgArr, setSubImgArr] = useState<SubImgArrProps[]>();

    useEffect(() => {
        if (clothesById?.subImageUrls) {
            const parseSubImageUrls: string[] = JSONparse(clothesById?.subImageUrls);
            const formattedArr: SubImgArrProps[] = parseSubImageUrls.map((url: string) => ({ url }));
            setSubImgArr(formattedArr);
        }
    }, [clothesById]);

    // useEffect(() => {
    //     if (subImgArr) {
    //         dispatch(getProductGallery(subImgArr));
    //         console.log('chay dispatch getProductGallery');
    //     }
    // }, [dispatch, subImgArr]);

    useEffect(() => {
        if (clothesById) {
            form.reset({
                name: clothesById.name,
                price: clothesById.price.toString(),
                description: clothesById.description,
                descriptionSort: clothesById.descriptionSort,
            });
        }
    }, [clothesById, form]);

    useEffect(() => {
        if (successEdit) {
            const basePath = router.pathname.replace('[productId]', '');
            // console.log(basePath);
            // router.push(basePath);
        }
    }, [router, successEdit]);

    const { categoriesInfo, subCateInfo } = useSelector((state: RootState) => state.categories);
    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);
    const [selectedCate, setSelectedCate] = useState<string>();

    useEffect(() => {
        if (selectedCate) {
            dispatch(getSubCateByCateIdThunk(parseInt(selectedCate)));
        }
    }, [dispatch, selectedCate]);

    const [subCateStringArray, setSubCateStringArray] = useState<string[]>();
    useEffect(() => {
        if (subCateInfo) {
            const subCateStringArray = convertSubCategoriesToArray(subCateInfo);
            setSubCateStringArray(subCateStringArray);
        }
    }, [, subCateInfo]);
    async function onSubmit(data: AddCateFormValues) {
        console.log(data);
        try {
            if (productId && typeof productId === 'string') {
                const name = data.name;
                const price = data.price;
                const imageUrl = saveProductImage ? saveProductImage.url : clothesById?.imageUrl;
                const subImageUrls = saveProductGallery?.map((image) => image.url);
                const description = data.description;
                const descriptionSort = data.descriptionSort;
                const subCategoryId = data.subCategoryId;
                await dispatch(
                    editClothesThunk({
                        editClothes: {
                            name,
                            price,
                            imageUrl,
                            subImageUrls,
                            description,
                            descriptionSort,
                            subCategoryId,
                        },
                        id: productId,
                    }),
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AdminLayout token={token}>
            {loading ? (
                <div className="h-full flex items-center">
                    <Loading size="large" />
                </div>
            ) : (
                <div className=" mx-auto">
                    <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full space-y-4">
                                <FormFieldInput form={form} name="name" />
                                <FormFieldInput form={form} name="price" type="number" />
                                <div>
                                    <ProductImage />
                                    <Image
                                        src={
                                            saveProductImage
                                                ? saveProductImage.url
                                                : clothesById
                                                ? clothesById.imageUrl
                                                : '/img/no-image.jpg'
                                        }
                                        alt={`img`}
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        className="w-40 h-40 "
                                    />
                                </div>
                                <div>
                                    <ProductGallery existed={subImgArr} />
                                    <div className="flex gap-2">
                                        {saveProductGallery
                                            ? saveProductGallery.map((item, idx: number) => {
                                                  return (
                                                      <Image
                                                          key={`img-${item.public_id}`}
                                                          src={item.url}
                                                          alt={`img`}
                                                          width="0"
                                                          height="0"
                                                          sizes="100vw"
                                                          className="w-28 h-28 "
                                                      />
                                                  );
                                              })
                                            : subImgArr
                                            ? subImgArr.map((item, idx: number) => {
                                                  return (
                                                      <Image
                                                          key={`img-${item.url}`}
                                                          src={item.url}
                                                          alt={`img`}
                                                          width="0"
                                                          height="0"
                                                          sizes="100vw"
                                                          className="w-28 h-28 "
                                                      />
                                                  );
                                              })
                                            : 'nothing here'}
                                    </div>
                                </div>
                                <FormFieldArena form={form} name="description" />
                                <FormFieldArena form={form} name="descriptionSort" placeholder="description sort" />
                                <Select onValueChange={(value) => setSelectedCate(value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Category</SelectLabel>
                                            {categoriesInfo?.map((item, idx) => {
                                                return (
                                                    <SelectItem
                                                        className="uppercase"
                                                        key={idx}
                                                        value={item.id.toString()}
                                                    >
                                                        {item.name}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {subCateInfo && (
                                    <FormField
                                        control={form.control}
                                        name="subCategoryId"
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel className="text-black font-semibold text-sm uppercase">
                                                        Sub Category
                                                    </FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="flex flex-col space-y-1"
                                                        >
                                                            {subCateInfo.map((item, idx: number) => {
                                                                return (
                                                                    <FormItem
                                                                        key={item.id}
                                                                        className="flex items-center space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <RadioGroupItem
                                                                                value={item.id.toString()}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal uppercase">
                                                                            {item.name}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                );
                                                            })}
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                )}
                                {/* <FormFieldInput form={form} name="description" />
            <FormFieldInput form={form} name="descriptionSort" />
            <FormFieldInput form={form} name="subCategoryId" />
            <FormFieldInput form={form} name="sizes" />
            <FormFieldInput form={form} name="colors" />
            <FormFieldInput form={form} name="gender" />
            <FormFieldInput form={form} name="stock" type="number" /> */}
                                <Button
                                    type="submit"
                                    className="btn-aware w-full text-white uppercase font-bold rounded-[6px] "
                                >
                                    Add
                                    <span className={`bg-[#00668F]   !duration-[800ms]`}></span>
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminClothesAdd;
export const convertSubCategoriesToArray = (subCates: SubCateProps[]) => {
    return subCates.map((subCate) => subCate.name);
};
