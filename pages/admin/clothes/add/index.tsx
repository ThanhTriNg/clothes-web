// import { Button } from '@/components/ui/button';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

import LayoutAddOrEdit from '@/pages/admin/clothes/(layoutAddOrEdit)';

// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';

// import { FormFieldArena, FormFieldInput } from '@/components/FormFieldCustom';
// import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
// import { SubCateProps } from '@/redux/module';
// import { getCategoriesThunk, getSubCateByCateIdThunk } from '@/redux/reducer/Categories';
// import { addClothesThunk } from '@/redux/reducer/Clothes';
// import { AppDispatch, RootState } from '@/redux/store/Store';
// import { useDispatch, useSelector } from 'react-redux';
// // import MediaLibrary from '@/components/mediaLibrary';

// import ProductImage from '@/pages/admin/clothes/add/ProductImage';
// import ProductGallery from '@/pages/admin/clothes/add/ProductGallery';
// import Image from 'next/image';
// const addCateFormSchema = z.object({
//     name: z.string().min(10, {
//         message: 'Name must be at least 1 characters.',
//     }),
//     price: z.string().min(1),
//     imageUrl: z.any(),
//     subImageUrls: z.any(),
//     description: z
//         .string()
//         .min(10, {
//             message: 'Description must be at least 10 characters.',
//         })
//         .max(500, {
//             message: 'Description must not be longer than 500 characters.',
//         }),
//     descriptionSort: z
//         .string()
//         .min(10, {
//             message: 'Description must be at least 10 characters.',
//         })
//         .max(150, {
//             message: 'Description must not be longer than 150 characters.',
//         }),
//     subCategoryId: z.string(),
//     // sizes: z.string().min(1),
//     // colors: z.string().min(1),
//     // gender: z.string().min(1),
//     // stock: z.string().min(1),
// });

// type AddCateFormValues = z.infer<typeof addCateFormSchema>;
// interface AdminClothesProps {
//     token: string;
// }
// const AdminClothesAdd = ({ token }: AdminClothesProps) => {
//     const form = useForm<AddCateFormValues>({
//         resolver: zodResolver(addCateFormSchema),
//         defaultValues: {
//             name: '',
//             price: '0',
//         },
//         mode: 'onSubmit',
//     });
//     const dispatch = useDispatch<AppDispatch>();

//     const [selectedFiles, setSelectedFiles] = useState<any>([]);

//     const handleImageFileChange = (event: any, onChange: any) => {
//         const selectedFile = event.target.files;
//         const maxFilesAllowed = 1; // Set your desired limit here

//         if (selectedFile && selectedFile.length > maxFilesAllowed) {
//             alert(`You can only select up to ${maxFilesAllowed} files.`);
//             event.target.value = ''; // Clear the selected files
//             return;
//         }
//         onChange(selectedFile && selectedFile[0]);
//     };

//     const handleFileChange = (event: any) => {
//         setSelectedFiles([...event.target.files]);
//     };
//     const { categoriesInfo, subCateInfo } = useSelector((state: RootState) => state.categories);
//     const { saveProductImage, saveProductGallery } = useSelector((state: RootState) => state.media);
//     useEffect(() => {
//         dispatch(getCategoriesThunk());
//     }, [dispatch]);
//     const [selectedCate, setSelectedCate] = useState<string>();

//     useEffect(() => {
//         if (selectedCate) {
//             dispatch(getSubCateByCateIdThunk(parseInt(selectedCate)));
//         }
//     }, [dispatch, selectedCate]);

//     // console.log(subCateInfo);
//     const [subCateStringArray, setSubCateStringArray] = useState<string[]>();
//     useEffect(() => {
//         if (subCateInfo) {
//             const subCateStringArray = convertSubCategoriesToArray(subCateInfo);
//             setSubCateStringArray(subCateStringArray);
//         }
//     }, [, subCateInfo]);

//     // const handleGallery=()=>{
//     //     saveProductGallery.forEach(item => {

//     //     });
//     // }

//     const urls = saveProductGallery?.map((image) => image.url);
//     console.log(urls);
//     async function onSubmit(data: AddCateFormValues) {
//         console.log(data);
//         try {
//             const name = data.name;
//             const price = data.price;
//             const imageUrl = saveProductImage?.url;
//             const subImageUrls = saveProductGallery?.map((image) => image.url);
//             const description = data.description;
//             const descriptionSort = data.descriptionSort;
//             const subCategoryId = data.subCategoryId;
//             console.log('imageUrl>>>', imageUrl);
//             // console.log(selectedFiles);
//             if (saveProductImage) {
//                 dispatch(
//                     addClothesThunk({
//                         name,
//                         price,
//                         imageUrl,
//                         subImageUrls,
//                         description,
//                         descriptionSort,
//                         subCategoryId,
//                     }),
//                 );
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         console.log('add saveProductImage>>', saveProductImage);
//     }, [saveProductImage]);
//     useEffect(() => {
//         console.log('add saveProductGallery>>', saveProductGallery);
//     }, [saveProductGallery]);
//     return (
//         <AdminLayout token={token}>
//             <div className=" mx-auto">
//                 <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full space-y-4">
//                             <FormFieldInput form={form} name="name" />
//                             <FormFieldInput form={form} name="price" type="number" />

//                             <div>
//                                 <ProductImage />
//                                 <Image
//                                     src={saveProductImage ? saveProductImage.url : '/img/no-image.jpg'}
//                                     alt={`img`}
//                                     width="0"
//                                     height="0"
//                                     sizes="100vw"
//                                     className="w-40 h-40 "
//                                 />
//                             </div>

//                             <div>
//                                 <ProductGallery />
//                                 <div className="flex gap-2">
//                                     {saveProductGallery?.map((item, idx: number) => {
//                                         return (
//                                             <Image
//                                                 key={`img-${item.asset_id}`}
//                                                 src={item.url}
//                                                 alt={`img`}
//                                                 width="0"
//                                                 height="0"
//                                                 sizes="100vw"
//                                                 className="w-28 h-28 "
//                                             />
//                                         );
//                                     })}
//                                 </div>
//                             </div>

//                             {/* <FormField
//                                 control={form.control}
//                                 name="imageUrl"
//                                 render={({ field: { value, onChange, ...fieldProps } }) => {
//                                     // console.log(value);
//                                     return (
//                                         <FormItem>
//                                             <FormLabel className="text-black font-semibold text-sm uppercase">
//                                                 imageUrl
//                                             </FormLabel>
//                                             <FormControl>
//                                                 <Input
//                                                     multiple
//                                                     type="file"
//                                                     // variant="default"
//                                                     placeholder="imageUrl"
//                                                     {...fieldProps}
//                                                     accept="image/*"
//                                                     onChange={(event) => {
//                                                         handleImageFileChange(event, onChange);
//                                                     }}
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     );
//                                 }}
//                             /> */}
//                             {/* <FormField
//                                 control={form.control}
//                                 name="subImageUrls"
//                                 render={({ field: { value, onChange, ...fieldProps } }) => {
//                                     // console.log(value);
//                                     return (
//                                         <FormItem>
//                                             <FormLabel className="text-black font-semibold text-sm uppercase">
//                                                 subImageUrls
//                                             </FormLabel>
//                                             <FormControl>
//                                                 <Input
//                                                     multiple
//                                                     type="file"
//                                                     // variant="default"
//                                                     placeholder="subImageUrls"
//                                                     {...fieldProps}
//                                                     accept="image/*"
//                                                     onChange={handleFileChange}
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     );
//                                 }}
//                             /> */}
//                             <FormFieldArena form={form} name="description" />
//                             <FormFieldArena form={form} name="descriptionSort" placeholder="description sort" />

//                             {/* <Select onValueChange={(value) => setSelectedCate(value)}>
//                                 <SelectTrigger className="w-[180px]">
//                                     <SelectValue placeholder="Select a category" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectGroup>
//                                         <SelectLabel>Category</SelectLabel>
//                                         {categoriesInfo?.map((item, idx) => {
//                                             return (
//                                                 <SelectItem className="uppercase" key={idx} value={item.id.toString()}>
//                                                     {item.name}
//                                                 </SelectItem>
//                                             );
//                                         })}
//                                     </SelectGroup>
//                                 </SelectContent>
//                             </Select>
//                             {subCateInfo && (
//                                 <FormField
//                                     control={form.control}
//                                     name="subCategoryId"
//                                     render={({ field }) => {
//                                         return (
//                                             <FormItem>
//                                                 <FormLabel className="text-black font-semibold text-sm uppercase">
//                                                     Sub Category
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <RadioGroup
//                                                         onValueChange={field.onChange}
//                                                         defaultValue={field.value}
//                                                         className="flex flex-col space-y-1"
//                                                     >
//                                                         {subCateInfo.map((item, idx: number) => {
//                                                             return (
//                                                                 <FormItem
//                                                                     key={item.id}
//                                                                     className="flex items-center space-x-3 space-y-0"
//                                                                 >
//                                                                     <FormControl>
//                                                                         <RadioGroupItem value={item.id.toString()} />
//                                                                     </FormControl>
//                                                                     <FormLabel className="font-normal uppercase">
//                                                                         {item.name}
//                                                                     </FormLabel>
//                                                                 </FormItem>
//                                                             );
//                                                         })}
//                                                     </RadioGroup>
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         );
//                                     }}
//                                 />
//                             )} */}

//                             <FormField
//                                 control={form.control}
//                                 name="subCategoryId"
//                                 render={({ field }) => {
//                                     return (
//                                         <FormItem>
//                                             <FormLabel className="text-black font-semibold text-sm uppercase">
//                                                 Categories
//                                             </FormLabel>
//                                             <FormControl>
//                                                 <RadioGroup
//                                                     onValueChange={field.onChange}
//                                                     defaultValue={field.value}
//                                                     className="flex flex-col space-y-1 ml-2"
//                                                 >
//                                                     {categoriesInfo?.map((item, idx: number) => {
//                                                         return (
//                                                             <div key={`$cate-${item.id}`} className="space-y-2">
//                                                                 <p className="text-sm"> {item.name} </p>
//                                                                 <div className="space-y-2 ml-4">
//                                                                     {item.Sub_Categories?.map(
//                                                                         (subCate, idx: number) => {
//                                                                             return (
//                                                                                 <FormItem
//                                                                                     key={`subCate-${subCate.id}`}
//                                                                                     className="flex items-center space-x-1 space-y-0"
//                                                                                 >
//                                                                                     <FormControl>
//                                                                                         <RadioGroupItem
//                                                                                             value={subCate.id.toString()}
//                                                                                         />
//                                                                                     </FormControl>
//                                                                                     <FormLabel className="font-normal">
//                                                                                         {subCate.name}
//                                                                                     </FormLabel>
//                                                                                 </FormItem>
//                                                                                 // <div
//                                                                                 //     key={`subCate-${subCate.id}`}
//                                                                                 //     className="flex items-center space-x-2"
//                                                                                 // >
//                                                                                 //     <RadioGroupItem
//                                                                                 //         value={`subCate-${subCate.id}`}
//                                                                                 //         id={`subCate-${subCate.id}`}
//                                                                                 //     />
//                                                                                 //     <Label
//                                                                                 //         htmlFor={`subCate-${subCate.id}`}
//                                                                                 //     >
//                                                                                 //         {subCate.name}
//                                                                                 //     </Label>
//                                                                                 // </div>
//                                                                             );
//                                                                         },
//                                                                     )}
//                                                                 </div>
//                                                             </div>
//                                                         );
//                                                     })}
//                                                 </RadioGroup>
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     );
//                                 }}
//                             />

//                             {/* <div>
//                                 <p>Categories</p>
//                                 <RadioGroup className="flex flex-col space-y-1" defaultValue={'1'}>
//                                     {categoriesInfo?.map((item, idx: number) => {
//                                         return (
//                                             <div key={`$cate-${item.id}`}>
//                                                 <p> {item.name} </p>
//                                                 <div>
//                                                     {item.Sub_Categories?.map((subCate, idx: number) => {
//                                                         return (
//                                                             <div
//                                                                 key={`subCate-${subCate.id}`}
//                                                                 className="flex items-center space-x-2"
//                                                             >
//                                                                 <RadioGroupItem
//                                                                     value={`subCate-${subCate.id}`}
//                                                                     id={`subCate-${subCate.id}`}
//                                                                 />
//                                                                 <Label htmlFor={`subCate-${subCate.id}`}>
//                                                                     {subCate.name}
//                                                                 </Label>
//                                                             </div>
//                                                         );
//                                                     })}
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                                 </RadioGroup>
//                             </div> */}

//                             {/* <FormFieldInput form={form} name="description" />
//             <FormFieldInput form={form} name="descriptionSort" />
//             <FormFieldInput form={form} name="subCategoryId" />
//             <FormFieldInput form={form} name="sizes" />
//             <FormFieldInput form={form} name="colors" />
//             <FormFieldInput form={form} name="gender" />
//             <FormFieldInput form={form} name="stock" type="number" /> */}

//                             <Button
//                                 type="submit"
//                                 className="btn-aware w-full text-white uppercase font-bold rounded-[6px] "
//                             >
//                                 Add
//                                 <span className={`bg-[#00668F]   !duration-[800ms]`}></span>
//                             </Button>
//                         </form>
//                     </Form>
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// };

// export default AdminClothesAdd;
// export const convertSubCategoriesToArray = (subCates: SubCateProps[]) => {
//     return subCates.map((subCate) => subCate.name);
// };

import { useEffect } from 'react';

import { SubCateProps } from '@/redux/module';
import { getCategoriesThunk } from '@/redux/reducer/Categories';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { useDispatch, useSelector } from 'react-redux';
// import MediaLibrary from '@/components/mediaLibrary';

interface AdminClothesProps {
    token: string;
}
const AdminClothesAdd = ({ token }: AdminClothesProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const { categoriesInfo } = useSelector((state: RootState) => state.categories);
    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    return categoriesInfo && <LayoutAddOrEdit token={token} categoriesInfo={categoriesInfo} />;
};

export default AdminClothesAdd;
export const convertSubCategoriesToArray = (subCates: SubCateProps[]) => {
    return subCates.map((subCate) => subCate.name);
};
