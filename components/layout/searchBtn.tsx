import { getCategoriesThunk } from '@/redux/reducer/Categories';
import { getClothesByNameThunk } from '@/redux/reducer/Clothes';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { MagnifyingGlass } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertNameCate } from '../LimitedPromotion';
import { Input } from '../ui/input';
import { CategoriesProps } from '@/redux/module';
import Loading from '@/components/loading';
import { formatPrice } from '@/utils';

const Search = () => {
    const router = useRouter();
    const [inputValue, setInputValue] = useState<string | null>(localStorage.getItem('q'));
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>('null');
    // const [enterValue, setEnterValue] = useState<string | undefined>();
    const [paramsSearch, setParamsSearch] = useState<string | null>(localStorage.getItem('q'));

    const { clothesByName, loadingClothesByName } = useSelector((state: RootState) => state.clothes);
    const { categoriesInfo } = useSelector((state: RootState) => state.categories);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        console.log(clothesByName);
    }, [clothesByName]);

    //debounce
    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            if (inputValue !== null && inputValue !== '') {
                console.log('inputValue', inputValue);
                setDebouncedInputValue(inputValue);
            } else {
                console.log('inputValue', inputValue);
                setDebouncedInputValue('null');
            }
        }, 400);
        return () => clearTimeout(delayInputTimeoutId);
    }, [inputValue]);

    useEffect(() => {
        dispatch(getClothesByNameThunk(debouncedInputValue));
    }, [dispatch, debouncedInputValue]);

    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleOnEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue) {
            if (localStorage.getItem('q')) {
                setParamsSearch(inputValue.trim());
            } else {
                localStorage.setItem('q', inputValue.trim());
                setParamsSearch(inputValue.trim());
            }
        }
    };
    useEffect(() => {
        if (paramsSearch) {
            const query = paramsSearch ? { q: paramsSearch } : {};
            router.push({
                pathname: '/store',
                query,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsSearch]);
    return (
        <>
            <div className="relative group">
                <div className=" relative flex justify-between items-center">
                    {!inputValue && (
                        <MagnifyingGlass
                            size={16}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 "
                        />
                    )}
                    <Input
                        type="text"
                        onChange={handleInputChange}
                        value={inputValue ? inputValue : ''}
                        onKeyDown={(e) => handleOnEnterDown(e)}
                    />
                    {loadingClothesByName && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                            <Loading />
                        </div>
                    )}
                </div>

                {categoriesInfo && clothesByName && clothesByName.length > 0 && (
                    <div className="mt-2 shadow-md md:absolute md:left-auto left-0 fixed md:w-[450px] w-[100vw] bg-gray-50 p-3 -right-1/2 rounded-sm hidden group-focus-within:block">
                        {clothesByName.map((item, idx: number) => {
                            const cateName = item.Sub_Category.Categories[0].name.toLowerCase();
                            // const category = findCategory(item.subCategoryId, categoriesInfo);
                            // const cateName = convertNameCate(category?.name as any);
                            const { convertPrice } = formatPrice(item.price);
                            return (
                                <div key={`cart-item-${idx}`} className="">
                                    <Link href={`/store/${cateName}/detail/${item.id}`}>
                                        <div className="grid grid-cols-3 p-2 items-center hover:bg-black/10 hover:cursor-pointer gap-x-2">
                                            <Image
                                                src={item.imageUrl}
                                                width="0"
                                                height="0"
                                                sizes="100vw"
                                                alt=""
                                                className="col-span-1 w-full  !mt-0"
                                            />
                                            <h1 className="col-span-1 truncate-2"> {item.name} </h1>
                                            <h1 className="col-span-1  text-center">{convertPrice}đ</h1>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Search;

export const findCategory = (categoryId: number | undefined, categoriesInfo: CategoriesProps[] | null) => {
    if (categoriesInfo) {
        return categoriesInfo.find((category) => category.id === categoryId);
    }
};
