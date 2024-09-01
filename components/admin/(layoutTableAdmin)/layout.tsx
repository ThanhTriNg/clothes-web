import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import { columnsClothes } from '@/pages/admin/clothes/column';
import { columnsOrder } from '@/pages/admin/orders/column';
import { ClothesProps, ClothesPropsData, OrderAPIProps, PaginationProps, SortValueType } from '@/redux/module';
import { deleteClothesByIdThunk, getClothesThunk } from '@/redux/reducer/Clothes';
import { getOrderAdminThunk } from '@/redux/reducer/Order';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnDef } from '@tanstack/react-table';

interface ParamsAPIProps extends SortValueType {
    page: number;
    pageSize: number;
}

interface LayoutTableAdminProps<TData, TValue> {
    token: string;
    dataAPI: TData[];
    paginationAPI: PaginationProps;
    columns: ColumnDef<TData, TValue>[];
    paramsAPIs: ParamsAPIProps;
    onChangeParamsAPI: (value: ParamsAPIProps) => void;
    renderRowActions?: (row: TData) => JSX.Element;
}
export interface PaginationInfoProps {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
}
export const pagePerRow = [4, 5, 6, 7, 8];

const LayoutTableAdmin = <TData, TValue>({
    token,
    dataAPI,
    paginationAPI,
    columns,
    paramsAPIs,
    onChangeParamsAPI,
    renderRowActions,
}: LayoutTableAdminProps<TData, TValue>) => {
    const router = useRouter();
    const pageSizeLocal = localStorage.getItem('pageSize');
    const { p } = router.query;
    // console.log('paramsAPIs>>', paramsAPIs);
    // const { dataAPI } = useSelector((state: RootState) => state.orders);
    const [paramsAPI, setParamsAPI] = useState<ParamsAPIProps>({
        page: paramsAPIs.page,
        pageSize: paramsAPIs.pageSize,
        sortBy: paramsAPIs.sortBy,
        sortOrder: paramsAPIs.sortOrder,
    });

    useEffect(() => {
        if (router.isReady) {
            if (typeof p === 'string') {
                setParamsAPI((prev) => ({
                    ...prev,
                    page: parseInt(p),
                }));
            } else {
                setParamsAPI((prev) => ({
                    ...prev,
                    page: 1,
                }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [p]);

    useEffect(() => {
        onChangeParamsAPI(paramsAPI);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsAPI]);

    const [paginationInfo, setPaginationInfo] = useState<PaginationInfoProps>();
    const onChangePageTable = (value: number) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, p: value },
        });
    };

    const [pageSize, setPageSize] = useState<number>(
        typeof pageSizeLocal === 'string' ? parseInt(pageSizeLocal) : pagePerRow[0],
    );

    const onChangePageSizeTable = (value: string) => {
        localStorage.setItem('pageSize', value);
        setParamsAPI((prev) => ({
            ...prev,
            pageSize: parseInt(value),
        }));
    };

    useEffect(() => {
        if (paginationAPI) {
            const { currentPage, pageSize, totalPages, totalCount } = paginationAPI;
            setPaginationInfo({ currentPage, pageSize, totalPages, totalCount });
        }
    }, [dataAPI, paginationAPI]);

    const handleSort = (sortBy: string, sortOrder: 'ASC' | 'DESC' | undefined) => {
        setParamsAPI((prev) => ({
            ...prev,
            sortBy,
            sortOrder,
        }));

        // onChangeParamsAPI({
        //     ...paramsAPI,
        //     sortBy,
        //     sortOrder,
        // });
    };
    return (
        <AdminLayout token={token}>
            {dataAPI && (
                <div className="mx-auto ">
                    <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
                        <DataTable
                            columns={columns}
                            data={dataAPI}
                            paginationInfo={paginationInfo}
                            onChangePageTable={onChangePageTable}
                            onChangePageSizeTable={onChangePageSizeTable}
                            pagePerRow={pagePerRow}
                            onSortChange={(sortBy, sortOrder) => {
                                handleSort(sortBy, sortOrder);
                            }}
                            renderRowActions={renderRowActions}
                        />
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default LayoutTableAdmin;
