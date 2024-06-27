import Cookies from 'js-cookie';
export interface ParamsProps {
    [key: string]: string | undefined | number;
}

import AxiosClient, { AxiosClient2, TheColorAPI } from './AxiosClient';
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
    addClothes: (formData: any) => {
        return AxiosClient2.post('/clothes', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    getCategories: () => {
        return AxiosClient.get('/categories');
    },
};

export default ClothesApi;
