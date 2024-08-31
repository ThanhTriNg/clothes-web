import StoreUI from '@/components/storeUI';
import { getCategoriesThunk } from '@/redux/reducer/Categories';
import { getClothesThunk, getSearchClothesByNameThunk, getSort } from '@/redux/reducer/Clothes';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Store = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { q } = router.query;
    useEffect(() => {}, [router]);

    const { clothesInfo, sortValue, clothesByName, testTy } = useSelector((state: RootState) => state.clothes);
    const { categoriesInfo } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    useEffect(() => {
        if (q && typeof q === 'string') {
            dispatch(getSearchClothesByNameThunk(q));
        } else {
            // dispatch(
            //     getClothesThunk({
            //         sortBy: sortValue ? sortValue.sortBy : '',
            //         sortOrder: sortValue ? sortValue.sortOrder : '',
            //         page: 1,
            //     }),
            // );
            dispatch(
                getClothesThunk({
                    sortBy: sortValue?.sortBy,
                    sortOrder: sortValue?.sortOrder,
                    page: 1,
                }),
            );
        }
    }, [sortValue, dispatch, q]);

    return (
        clothesInfo &&
        categoriesInfo && (
            <>
                <StoreUI categoriesInfo={categoriesInfo} clothesInfo={clothesInfo} title={(q as string) || 'All'} />
            </>
        )
    );
};

export default Store;

export const textFilters = [
    {
        label: 'Featured',
    },
    {
        label: 'New arrivals',
    },
    {
        label: 'Low to high',
    },
    {
        label: 'High to low',
    },
];

export const getCategoryData = (category: string | string[]): string => {
    // Implement logic to fetch or return data based on the category
    switch (category) {
        case 'tops':
            return 'Áo';
        case 'bottoms':
            return 'Quần';
        case 'outwears':
            return 'Đồ mặc ngoài';
        case 'dresses':
            return 'Đầm';
        default:
            return '';
    }
};
