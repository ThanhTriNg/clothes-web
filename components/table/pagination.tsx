import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useEffect, useState } from 'react';
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
interface PaginationInfoProps {
    totalPages: number;
    currentPage: number;
    onChangePage: (value: number) => void;
    onChangePageSize: (value: string) => void;
}

const pagePerRow = [2, 4, 30];
const maxPagesToShow = 6;

export function PaginationTable({ totalPages, onChangePage, onChangePageSize }: PaginationInfoProps) {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<string>(pagePerRow[0].toString());

    const pagesArray: any[] = [];

    if (totalPages <= maxPagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
            pagesArray.push(i);
        }
    } else {
        const pageBreak = totalPages - 4;

        const pageBreakArrayPlus1: number[] = [];
        for (let i = 1; i <= pageBreak + 1; i++) {
            pageBreakArrayPlus1.push(i);
        }

        const pageBreakArrayReverse: number[] = [];
        for (let i = pageBreak; i > 0; i--) {
            pageBreakArrayReverse.push(i);
        }

        if (page <= pageBreak) {
            pagesArray.push(...pageBreakArrayPlus1, '...', totalPages);
        } else if (page > totalPages - 3) {
            pagesArray.push(1, '...');
            pageBreakArrayReverse.forEach((num: number) => {
                pagesArray.push(totalPages - num);
            });
            pagesArray.push(totalPages);
        } else {
            pagesArray.push(1, '...', page - 1, page, page + 1, '...', totalPages);
        }
    }

    useEffect(() => {
        onChangePage(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);
    useEffect(() => {
        onChangePageSize(pageSize);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize]);

    const handleClick = (pageNum: number) => {
        setPage(pageNum);
    };
    const handleClickDoubleLeft = () => {
        setPage(1);
    };
    const handleClickDoubleRight = () => {
        setPage(totalPages);
    };

    const handleClickLeft = () => {
        if (page > 1) setPage(page - 1);
    };
    const handleClickRight = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const checkLeftEnd = () => {
        if (page === 1) {
            return true;
        } else return false;
    };
    const checkRightEnd = () => {
        if (page >= totalPages) {
            return true;
        } else return false;
    };

    return (
        <div className="mt-4">
            <Pagination className="flex items-center gap-2">
                <PaginationContent >
                    <PaginationItem onClick={handleClickDoubleLeft}>
                        <PaginationLink
                            variant={checkLeftEnd() ? 'disabled' : 'default'}
                            className="select-none cursor-pointer"
                        >
                            <CaretDoubleLeft />
                        </PaginationLink>
                    </PaginationItem>

                    <PaginationItem onClick={handleClickLeft}>
                        <PaginationLink
                            variant={checkLeftEnd() ? 'disabled' : 'default'}
                            className="select-none cursor-pointer"
                        >
                            <CaretLeft />
                        </PaginationLink>
                    </PaginationItem>

                    {pagesArray.map((pageNum) => {
                        return typeof pageNum === 'number' ? (
                            <PaginationItem key={`pageNum-${pageNum}`}>
                                <PaginationLink
                                    className={`select-none cursor-pointer ${
                                        pageNum === page ? 'bg-primary hover:bg-primary' : ''
                                    }`}
                                    onClick={(e) => handleClick(pageNum)}
                                >
                                    {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        ) : (
                            <div>{pageNum}</div>
                        );
                    })}
                    <PaginationItem onClick={handleClickRight}>
                        <PaginationLink
                            variant={checkRightEnd() ? 'disabled' : 'default'}
                            className="select-none cursor-pointer"
                        >
                            <CaretRight />
                        </PaginationLink>
                    </PaginationItem>

                    <PaginationItem onClick={handleClickDoubleRight}>
                        <PaginationLink
                            variant={checkRightEnd() ? 'disabled' : 'default'}
                            className="select-none cursor-pointer"
                        >
                            <CaretDoubleRight />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>

                <Select value={pageSize} onValueChange={(value) => setPageSize(value)}>
                    <SelectTrigger className="h-8 w-[70px] border border-solid border-primary">
                        <SelectValue placeholder={pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {pagePerRow.map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Pagination>
        </div>
    );
}
