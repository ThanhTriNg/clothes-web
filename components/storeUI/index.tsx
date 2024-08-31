import { ComboBoxProps, TextFilterType } from '@/common/type';
import ProductList from '@/components/productList';
import ProductNav from '@/components/productNav';
import { Combobox } from '@/components/selectBox';
import { CategoriesProps, ClothesProps } from '@/redux/module';

interface StoreUIProps {
    clothesInfo: ClothesProps;
    categoriesInfo: CategoriesProps[];
    title: string;
}

const StoreUI = ({ clothesInfo, categoriesInfo, title }: StoreUIProps) => {
    return (
        <div className="min-h-screen ">
            {categoriesInfo && (
                <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
                    <h1 className="uppercase font-bold text-3xl p-10">{title}</h1>

                    <div className="flex justify-between">
                        <div className="space-y-3">
                            <h1>Result</h1>
                            <p>{clothesInfo.data.length} item(s)</p>
                        </div>
                        <div className="space-y-3">
                            <h1>Sort by</h1>
                            <Combobox textFilters={textFilters} />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-8 ">
                        <ProductNav className="md:col-span-4 col-span-full mb-4 md:mb-0" categoryArr={categoriesInfo} />
                        <ProductList
                            className="md:col-span-8 col-span-full"
                            products={clothesInfo.data}
                            categoriesInfo={categoriesInfo}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreUI;
const textFilters: TextFilterType[] = [
    {
        label: 'Featured',
    },
    {
        label: 'New arrivals',
        sortBy: 'createdAt',
        sortOrder: 'DESC',
    },
    {
        label: 'Low to high',
        sortBy: 'price',
        sortOrder: 'ASC',
    },
    {
        label: 'High to low',
        sortBy: 'price',
        sortOrder: 'DESC',
    },
];
