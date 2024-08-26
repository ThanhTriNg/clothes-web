'use client';

import { SortAscending, SortDescending } from '@phosphor-icons/react';
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { PaginationTable } from '@/components/table/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    renderRowActions?: (row: TData) => JSX.Element;
    paginationInfo?: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalCount: number;
    };
    onChangePageTable: (value: number) => void;
    onChangePageSizeTable: (value: string) => void;
    pagePerRow: number[];
}

const getRowColor = (rowIndex: number) => {
    return rowIndex % 2 === 0 ? '#F6F6F6' : '#FFF'; // Even rows are light blue, odd rows are light gray
};

export function DataTable<TData, TValue>({
    columns,
    data,
    renderRowActions,
    paginationInfo,
    onChangePageTable,
    onChangePageSizeTable,
    pagePerRow,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },

        initialState: {
            sorting: [
                {
                    id: 'price',
                    desc: false,
                },
                {
                    id: 'name',
                    desc: true,
                },
            ],
        },
    });
    const onChangePage = (value: number) => {
        onChangePageTable(value);
    };
    const onChangePageSize = (value: string) => {
        onChangePageSizeTable(value);
    };
    return (
        <div className="rounded-md border">
            <Table className="table-fixed">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="bg-white">
                                        {header.isPlaceholder ? null : (
                                            <div
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getIsSorted() === 'asc'
                                                            ? 'Sort ascending'
                                                            : header.column.getIsSorted() === 'desc'
                                                            ? 'Sort descending'
                                                            : 'Clear sort'
                                                        : undefined
                                                }
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{
                                                    asc: <SortAscending />,
                                                    desc: <SortDescending />,
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>

                                            // <div
                                            //     className={
                                            //         header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                                            //     }
                                            //     onClick={header.column.getToggleSortingHandler()}
                                            //     title={
                                            //         header.column.getCanSort()
                                            //             ? header.column.getNextSortingOrder() === 'asc'
                                            //                 ? 'Sort ascending'
                                            //                 : header.column.getNextSortingOrder() === 'desc'
                                            //                 ? 'Sort descending'
                                            //                 : 'Clear sort'
                                            //             : undefined
                                            //     }
                                            // >
                                            //     {flexRender(header.column.columnDef.header, header.getContext())}

                                            // </div>
                                        )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, idx: number) => {
                            const rowData = row.original;
                            return (
                                <TableRow
                                    // onClick={row.getToggleSelectedHandler()}
                                    style={{
                                        backgroundColor: getRowColor(idx),
                                    }}
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className="relative"
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                // style={{
                                                //     width: `${cell.column.getSize()}%`,
                                                // }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}

                                    {renderRowActions && <TableCell>{renderRowActions(rowData)}</TableCell>}
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {paginationInfo && (
                <PaginationTable
                    currentPage={paginationInfo.currentPage}
                    totalPages={paginationInfo.totalPages}
                    onChangePage={onChangePage}
                    onChangePageSize={onChangePageSize}
                    pagePerRow={pagePerRow}
                />
            )}
        </div>
    );
}
