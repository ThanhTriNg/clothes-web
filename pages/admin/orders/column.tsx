'use client';

// import { customSortCategoryName } from '@/components/table';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OrderDataProps } from '@/redux/module';
import { convertDateUTC7, formatPrice } from '@/utils';
import { DotsThree, SortAscending, SortDescending } from '@phosphor-icons/react';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect, useRef, useState } from 'react';
interface SortIconProps {
    isSorted: boolean;
}
const SortIcon: React.FC<SortIconProps> = ({ isSorted }) =>
    isSorted ? <SortAscending className="ml-2 h-4 w-4" /> : <SortDescending className="ml-2 h-4 w-4" />;
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

export const columnsOrder: ColumnDef<OrderDataProps>[] = [
    {
        accessorKey: 'id',
        header: 'Order',
        cell: ({ cell }) => {
            const value = cell.getValue<string>();
            return <p>#{value}</p>;
        },
    },
    {
        accessorKey: 'userFNameAtOrderTime',
        header: 'Name',
        cell: ({ cell }) => {
            const value = cell.getValue<string>();
            return <NameCell value={value} />;
        },
    },
    {
        accessorKey: 'userPhoneAtOrderTime',
        header: 'Phone',
    },
    {
        accessorKey: 'totalPrice',
        header: 'Total Price',
        cell: ({ row }) => {
            const orderItems = row.original.Order_items;
            let totalPrices = 0;
            orderItems.forEach((item) => {
                totalPrices += parseInt(item.priceAtOrderTime) * item.quantity;
            });
            const { convertPrice } = formatPrice(totalPrices);
            return <p>{convertPrice}</p>;
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Order date',
        cell: ({ cell }) => {
            const date = new Date(cell.getValue<string>());

            const { day, month, year, hours, minutes } = convertDateUTC7(date);

            const formattedDate = `${day}/${month}/${year} at ${hours}:${minutes}`;

            return <p>{formattedDate}</p>;
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsThree size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id.toString())}>
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`orders/detail/${row.original.id}`}>View details</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
