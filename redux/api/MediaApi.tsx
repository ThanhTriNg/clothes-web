import { ParamsProps } from '@/redux/api/ClothesApi';
import { UserAuthProps, UserProps } from '../module';
import AxiosClient, { AxiosClient2 } from './AxiosClient';
import Cookies from 'js-cookie';

const MediaApi = {
    getMedia: (params?: ParamsProps) => {
        const token = Cookies.get('token');
        return AxiosClient.get('/media', {
            params: { ...params },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    uploadImage: (formData: any) => {
        const token = Cookies.get('token');
        return AxiosClient2.post('/media', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};

export default MediaApi;
