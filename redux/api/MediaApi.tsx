import { ParamsProps } from '@/redux/api/ClothesApi';
import { UserAuthProps, UserProps } from '../module';
import AxiosClient from './AxiosClient';
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
};

export default MediaApi;
