import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { FormFieldArena, FormFieldInput } from '@/components/FormFieldCustom';
import Loading from '@/components/loading';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import ProductGallery from '@/pages/admin/clothes/(layoutAddOrEdit)/ProductGallery';
import ProductImage from '@/pages/admin/clothes/(layoutAddOrEdit)/ProductImage';
import { CategoriesProps, ClothesPropsData, SubCateProps } from '@/redux/module';
import { addClothesThunk, editClothesThunk } from '@/redux/reducer/Clothes';
import { AppDispatch, RootState } from '@/redux/store/Store';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
const addCateFormSchema = z.object({
    name: z.string().min(1, {
        message: 'Name must be at least 1 characters.',
    }),
    price: z.string().min(1),
    stock: z.string().min(1),
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
});

export type AddCateFormValues = z.infer<typeof addCateFormSchema>;

interface SubImgArrProps {
    url: string;
}
interface LayoutAddOrEditProps {
    token: string;
    categoriesInfo: CategoriesProps[];
    editMode?: {
        clothesById: ClothesPropsData | null;
        productId: string | string[] | undefined;
        subImgArr: SubImgArrProps[] | undefined;
    };
}
const LayoutAddOrEdit = ({ token, categoriesInfo, editMode }: LayoutAddOrEditProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.clothes);
    const { saveProductImage, saveProductGallery } = useSelector((state: RootState) => state.media);

    const [isFormReset, setIsFormReset] = useState<boolean>(false);

    const form = useForm<AddCateFormValues>({
        resolver: zodResolver(addCateFormSchema),
        defaultValues: {
            name: '',
            price: '0',
            stock: '0',
        },
        mode: 'onSubmit',
    });

    useEffect(() => {
        if (editMode) {
            const { clothesById } = editMode;

            if (clothesById && !isFormReset) {
                setIsFormReset(true);
                form.reset({
                    name: clothesById.name,
                    price: clothesById.price.toString(),
                    stock: clothesById.stock.toString(),
                    description: clothesById.description,
                    descriptionSort: clothesById.descriptionSort,
                    subCategoryId: clothesById.Sub_Category.id.toString(),
                });
            }
        }
    }, [editMode, form, isFormReset]);

    async function onSubmit(data: AddCateFormValues) {
        console.log(data);
        try {
            const name = data.name;
            const price = parseInt(data.price);
            const stock = parseInt(data.stock);
            const subImageUrls = saveProductGallery?.map((image) => image.url);
            const description = data.description;
            const descriptionSort = data.descriptionSort;
            const subCategoryId = data.subCategoryId;
            if (!editMode) {
                const imageUrl = saveProductImage?.url;
                if (saveProductImage) {
                    await dispatch(
                        addClothesThunk({
                            name,
                            price,
                            stock,
                            imageUrl,
                            subImageUrls,
                            description,
                            descriptionSort,
                            subCategoryId,
                        }),
                    );
                }
            } else {
                const { productId, clothesById } = editMode;
                if (productId && typeof productId === 'string') {
                    const imageUrl = saveProductImage ? saveProductImage.url : clothesById?.imageUrl;

                    await dispatch(
                        editClothesThunk({
                            editCloth: {
                                name,
                                price,
                                stock,
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
                                <FormFieldInput form={form} name="price" />
                                <FormFieldInput form={form} name="stock" />

                                {editMode ? (
                                    <>
                                        <div>
                                            <ProductImage />
                                            <Image
                                                src={
                                                    saveProductImage
                                                        ? saveProductImage.url
                                                        : editMode.clothesById
                                                        ? editMode.clothesById.imageUrl
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
                                            <ProductGallery existed={editMode.subImgArr} />
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
                                                    : editMode.subImgArr
                                                    ? editMode.subImgArr.map((item, idx: number) => {
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
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <ProductImage />
                                            <Image
                                                src={saveProductImage ? saveProductImage.url : '/img/no-image.jpg'}
                                                alt={`img`}
                                                width="0"
                                                height="0"
                                                sizes="100vw"
                                                className="w-40 h-40 "
                                            />
                                        </div>

                                        <div>
                                            <ProductGallery />
                                            <div className="flex gap-2">
                                                {saveProductGallery?.map((item, idx: number) => {
                                                    return (
                                                        <Image
                                                            key={`img-${item.asset_id}`}
                                                            src={item.url}
                                                            alt={`img`}
                                                            width="0"
                                                            height="0"
                                                            sizes="100vw"
                                                            className="w-28 h-28 "
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )}

                                <FormFieldArena form={form} name="description" />
                                <FormFieldArena form={form} name="descriptionSort" placeholder="description sort" />

                                <FormField
                                    control={form.control}
                                    name="subCategoryId"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel className="text-black font-semibold text-sm uppercase">
                                                    Categories
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex flex-col space-y-1 ml-2"
                                                    >
                                                        {categoriesInfo?.map((item, idx: number) => {
                                                            return (
                                                                <div key={`$cate-${item.id}`} className="space-y-2">
                                                                    <p className="text-sm"> {item.name} </p>
                                                                    <div className="space-y-2 ml-4">
                                                                        {item.Sub_Categories?.map(
                                                                            (subCate, idx: number) => {
                                                                                return (
                                                                                    <FormItem
                                                                                        key={`subCate-${subCate.id}`}
                                                                                        className="flex items-center space-x-1 space-y-0"
                                                                                    >
                                                                                        <FormControl>
                                                                                            <RadioGroupItem
                                                                                                value={subCate.id.toString()}
                                                                                            />
                                                                                        </FormControl>
                                                                                        <FormLabel className="font-normal">
                                                                                            {subCate.name}
                                                                                        </FormLabel>
                                                                                    </FormItem>
                                                                                );
                                                                            },
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />

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

export default LayoutAddOrEdit;
export const convertSubCategoriesToArray = (subCates: SubCateProps[]) => {
    return subCates.map((subCate) => subCate.name);
};
