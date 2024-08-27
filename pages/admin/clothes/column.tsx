'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import { customSortCategoryName } from '@/components/table';
import { ClothesPropsData } from '@/redux/module';
import { formatPrice } from '@/utils';
import { SortAscending, SortDescending } from '@phosphor-icons/react';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const NameCell = ({ value }: { value: string }) => {
    const [isTruncated, setIsTruncated] = useState<boolean>(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        if (textRef.current) {
            setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
        }
    }, [value]);
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <p ref={textRef} className="truncate">
                        {value}
                    </p>
                </TooltipTrigger>
                {isTruncated && <TooltipContent>{value}</TooltipContent>}
            </Tooltip>
        </TooltipProvider>
    );
};

export const columnsClothes: ColumnDef<ClothesPropsData>[] = [
    {
        accessorKey: 'name',

        header: 'Name',

        cell: ({ cell }) => {
            const value = cell.getValue<string>();
            return <NameCell value={value} />;
        },

        // size: 20,
    },
    {
        // size: 20,
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
        // size: 20,
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
        // size: 20,
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
        // size: 20,
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
