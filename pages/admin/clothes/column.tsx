'use client';

import SortBtn from '@/components/table/sortBtn';
import { Button } from '@/components/ui/button';
import { ClothesDataTable, ClothesProps, ClothesPropsData, SubCateInClothesProps } from '@/redux/module';
import { SortAscending, SortDescending } from '@phosphor-icons/react';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

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
        // header: ({ column }) => {
        //     return (
        //         <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        //             Price
        //             <SortIcon isSorted={column.getIsSorted() === 'asc'} />
        //         </Button>
        //     );
        // },

        header: ({ column }) => {
            return <SortBtn column={column} name="Price" />;
        },
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
        accessorKey: 'Sub_Category',
        header: ({ column }) => {
            return <SortBtn column={column} name="Sub Category" />;
        },
        cell: ({ cell }) => {
            const subCate = cell.getValue<SubCateInClothesProps>();
            return <p>{subCate.name}</p>;
        },
    },

    {
        accessorKey: 'Sub_Category',
        header: ({ column }) => {
            return <SortBtn column={column} name="Category" />;
        },
        cell: ({ cell }) => {
            const subCate = cell.getValue<SubCateInClothesProps>();

            return <p>{subCate.Categories[0].name}</p>;
        },
    },
];
