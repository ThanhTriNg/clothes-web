import Cookies from 'js-cookie';

import AxiosClient, { AxiosClient2, TheColorAPI } from './AxiosClient';
import { AddClothesProps, ClothesProps, ClothesPropsData, ParamsProps } from '@/redux/module';
const token = Cookies.get('token');

const ClothesApi = {
    // getLatestClothesTest: (params: { [key: string]: string }) => {
    //     const config = {
    //         params: { ...params },
    //     };
    //     return AxiosClient.get(`/clothes/`, config);
    // },
    getClothes: (params?: ParamsProps) => {
        const config = {
            params: { ...params },
        };
        return AxiosClient.get('/clothes', config);
    },

    getClothesById: (id: string) => {
        return AxiosClient.get(`/clothes/${id}`);
    },
    // getClothesByName: (name: string) => {
    //     return AxiosClient.get(`/clothes/?name=${name}`);
    // },
    addClothes: (clothes: AddClothesProps) => {
        return AxiosClient.post('/clothes', clothes, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    // editClothes: (formData: any, id: string) => {
    //     return AxiosClient2.patch(`/clothes/${id}`, formData, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
    // },
    editClothes: (clothes: AddClothesProps, id: string) => {
        return AxiosClient.patch(`/clothes/${id}`, clothes, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    deleteClothesById: (id: string) => {
        return AxiosClient.delete(`/clothes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    //cate
    getClothesByCategory: (categoryId: string, params?: ParamsProps) => {
        const config = {
            params: { ...params },
        };
        return AxiosClient.get(`/clothes/?categoryId=${categoryId}`, config);
    },
    // getLatestClothesByCategory: (categoryId: string) => {
    //     return AxiosClient.get(`/clothes/?categoryId=${categoryId}&sort=createdAt&order=DESC`);
    // },
    // getClothesPriceAscendingByCategory: (categoryId: string) => {
    //     return AxiosClient.get(`/clothes/?categoryId=${categoryId}&sort=price`);
    // },
    // getClothesPriceDescendingByCategory: (categoryId: string) => {
    //     return AxiosClient.get(`/clothes/?categoryId=${categoryId}&sort=price&order=DESC`);
    // },

    //sub Cate
    getClothesBySubCategory: (subCategoryId: number[], params?: ParamsProps) => {
        const config = {
            params: { ...params },
        };
        return AxiosClient.get(`/clothes/?subCategoryId=${subCategoryId}`, config);
    },
    // getLatestClothesBySubCategory: (subCategoryId: number[]) => {
    //     return AxiosClient.get(`/clothes/?subCategoryId=${subCategoryId}&sort=createdAt&order=DESC`);
    // },
    // getClothesPriceAscendingBySubCategory: (subCategoryId: number[]) => {
    //     return AxiosClient.get(`/clothes/?subCategoryId=${subCategoryId}&sort=price`);
    // },
    // getClothesPriceDescendingBySubCategory: (subCategoryId: number[]) => {
    //     return AxiosClient.get(`/clothes/?subCategoryId=${subCategoryId}&sort=price&order=DESC`);
    // },

    getColorName: (hex: string) => {
        return TheColorAPI.get(`/id?hex=${hex}`);
    },

    getCategories: () => {
        return AxiosClient.get('/categories');
    },
};

export default ClothesApi;
