import { CateApiProps, GetSubCateProps } from '../module';
import AxiosClient from './AxiosClient';
import Cookies from 'js-cookie';
const token = Cookies.get('token');

const CategoriesApi = {
    getCategories: () => {
        return AxiosClient.get('/categories');
    },

    getSubCateByCateId: (categoryId: number) => {
        return AxiosClient.get(`/subCategories?categoryId=${categoryId}`);
    },

    //create cate
    createCate: (category: CateApiProps) => {
        return AxiosClient.post('/categories', category, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    // sub cate
    getAllSubCate: () => {
        return AxiosClient.get('/subCategories');
    },
};

export default CategoriesApi;
