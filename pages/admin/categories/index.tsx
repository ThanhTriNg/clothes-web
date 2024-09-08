import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormFieldInput, FormFieldRadio } from '@/components/FormFieldCustom';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import { createCateThunk, getCategoriesThunk } from '@/redux/reducer/Categories';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/redux/store/Store';
import { useEffect, useState } from 'react';
import { CategoriesProps } from '@/redux/module';
import { PlusCircle } from '@phosphor-icons/react';

interface AdminCategoriesProps {
    token: string;
}
const AdminCategories = ({ token }: AdminCategoriesProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { categoriesInfo } = useSelector((state: RootState) => state.categories);
    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    const [menCate, setMenCate] = useState<CategoriesProps[]>();
    const [womenCate, setWomenCate] = useState<CategoriesProps[]>();

    useEffect(() => {
        if (categoriesInfo) {
            const womenCategories = categoriesInfo.filter((item) => item.gender === 'both' || item.gender === 'female');
            const menCategories = categoriesInfo.filter((item) => item.gender === 'both' || item.gender === 'male');
            setWomenCate(womenCategories);
            setMenCate(menCategories);
        }
    }, [categoriesInfo]);

    const cateGender = [
        {
            name: 'Men',
            cate: menCate,
        },
        {
            name: 'Women',
            cate: womenCate,
        },
    ];
    const handleAddNew = () => {
        // dispatch(createCateThunk());
    };
    return (
        <AdminLayout token={token}>
            <div className="mx-auto ">
                {/* {categoriesInfo?.map((item) => {
                    return (
                        <div key={item.id}>
                            <div className="">{item.name}</div>
                            {item.Sub_Categories.map((itemSub) => {
                                return (
                                    <div className="ml-2" key={`itemSub-${itemSub.id}`}>
                                        <p> {itemSub.name} </p>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })} */}

                {/* <div>
                    <p>Men</p>
                    <div className="ml-2 border-l border-black border-solid pl-3 space-y-2">
                        {menCate?.map((item) => {
                            return <p key={`men-${item.id}`}>{item.name}</p>;
                        })}
                        <div className="w-full  p-2 border-dashed border flex gap-x-2 items-center">
                            <PlusCircle size={20} /> <span>Add new </span>
                        </div>
                    </div>
                </div>

                <div>
                    <p>Women</p>
                    <div className="ml-2">
                        {womenCate?.map((item) => {
                            return <p key={`women-${item.id}`}>{item.name}</p>;
                        })}
                    </div>
                </div> */}

                <div className="space-y-4">
                    {cateGender.map((item) => {
                        return (
                            <div key={`itemGenderCate-${item.name}`}>
                                <p className="uppercase font-bold text-lg">{item.name}</p>
                                <div className="ml-2 border-l border-black border-solid pl-3 space-y-2">
                                    {item.cate?.map((item) => {
                                        return <p key={`men-${item.id}`}>{item.name}</p>;
                                    })}
                                    <div className="w-full  p-2 border-dashed border flex gap-x-2 items-center">
                                        <PlusCircle size={20} /> <span>Add new </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminCategories;
