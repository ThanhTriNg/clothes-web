'use client';

// import { customSortCategoryName } from '@/components/table';
import SortBtn from '@/components/table/sortBtn';
import { ClothesPropsData, SubCateInClothesProps } from '@/redux/module';
import { SortAscending, SortDescending } from '@phosphor-icons/react';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { formatPrice } from '@/utils';
interface SortIconProps {
    isSorted: boolean;
}
const SortIcon: React.FC<SortIconProps> = ({ isSorted }) =>
    isSorted ? <SortAscending className="ml-2 h-4 w-4" /> : <SortDescending className="ml-2 h-4 w-4" />;

export const columnsClothes: ColumnDef<ClothesPropsData>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        
    },

    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ cell }) => {
            const price = cell.getValue<number>();
            const { convertPrice } = formatPrice(price);
            return <p>{convertPrice}</p>;
        },
        // header: ({ column }) => {
        //     return (
        //         <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        //             Price
        //             <SortIcon isSorted={column.getIsSorted() === 'asc'} />
        //         </Button>
        //     );
        // },

        // header: ({ column }) => {
        //     return <SortBtn column={column} name="Price" />;
        // },
    },

    {
        accessorKey: 'imageUrl',
        header: 'Image',
        cell: ({ cell }) => {
            return (
                <Image
                    src={cell.getValue<string>()}
                    alt="cell"
                    width="200"
                    height="150"
                    className="w-16 h-16 object-cover"
                />
            );
        },
    },

    {
        id: 'category',
        accessorKey: 'Sub_Category',
        header: 'Category',
        accessorFn: (row) => row.Sub_Category.Categories[0].name,
        cell: ({ cell }) => {
            const categoryName = cell.getValue<string>();
            return <p>{categoryName}</p>;
        },
        // sortingFn: customSortCategoryName,
    },

    {
        id: 'subCategory',
        accessorKey: 'Sub_Category',
        header: 'Sub Category',
        accessorFn: (row) => row.Sub_Category.name,
        cell: ({ cell }) => {
            const subCategoryName = cell.getValue<string>();
            return <p>{subCategoryName}</p>;
        },
    },
];
