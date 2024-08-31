import StoreUI from '@/components/storeUI';
import { getCategoriesThunk, getSubCateByCateIdThunk } from '@/redux/reducer/Categories';
import { getClothesBySubCategoryThunk } from '@/redux/reducer/Clothes';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Category = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { category } = router.query;
    const { clothesInfo, sortValue } = useSelector((state: RootState) => state.clothes);
    const { categoriesInfo, subCateInfo } = useSelector((state: RootState) => state.categories);
    const [idCate, setIdCate] = useState<number>();

    const [idSubCate, setIdSubCate] = useState<number[] | undefined>([]);
    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    //call the api to get id cate
    useEffect(() => {
        categoriesInfo?.map((item, idx) => {
            const cateNameLower = item.name.toLowerCase();
            if (category === cateNameLower) {
                setIdCate(item.id);
                // dispatch(getSubCateByCateIdThunk(item.id));
            }
        });
    }, [categoriesInfo, category]);

    // if have id cate => get SUB CATE by id cate
    useEffect(() => {
        if (idCate) {
            dispatch(getSubCateByCateIdThunk(idCate));
        }
    }, [idCate, dispatch]);

    //reset setIdSubCate when change params
    useEffect(() => {
        setIdSubCate([]);
    }, [category]);

    //get SUB CATE success => set all id of SUB CATE to setIdSubCate
    useEffect(() => {
        subCateInfo?.map((item) => {
            setIdSubCate((prev: number[] | undefined) => {
                if (prev !== undefined) return [...prev, item.id];
            });
        });
    }, [subCateInfo]);

    useEffect(() => {
        if (idSubCate && idSubCate.length > 0) {
            dispatch(
                getClothesBySubCategoryThunk({
                    subCateId: idSubCate,
                    sortBy: sortValue?.sortBy,
                    sortOrder: sortValue?.sortOrder,
                }),
            );
        }
    }, [idSubCate, dispatch, sortValue]);

    useEffect(() => {}, [clothesInfo]);

    return (
        categoriesInfo &&
        clothesInfo?.data && (
            <StoreUI categoriesInfo={categoriesInfo} clothesInfo={clothesInfo} title={category as string} />
        )
    );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
    // Define the allowed categories
    const allowedCategories = ['tops', 'bottoms', 'outwears', 'dresses'];

    // Generate the paths based on the allowed categories
    const paths = allowedCategories.map((category) => ({
        params: { category },
    }));

    return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
    // Fetch data or perform any necessary logic based on the current category
    const category = params?.category || '';

    // Pass the category to the component
    return {
        props: {
            category,
        },
    };
};
