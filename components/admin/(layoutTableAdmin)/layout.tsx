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
    paramsAPI: ParamsAPIProps;
    onChangeParamsAPI: (value: ParamsAPIProps) => void;
    renderRowActions?: (row: TData) => JSX.Element;
}
export interface PaginationInfoProps {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
}
export const pagePerRow = [5, 10, 15, 20];

const LayoutTableAdmin = <TData, TValue>({
    token,
    dataAPI,
    paginationAPI,
    columns,
    paramsAPI,
    onChangeParamsAPI,
    renderRowActions,
}: LayoutTableAdminProps<TData, TValue>) => {
    const router = useRouter();
    const pageSizeLocal = localStorage.getItem('pageSize');
    const { p } = router.query;
    // console.log('paramsAPI>>', paramsAPI);
    // const { dataAPI } = useSelector((state: RootState) => state.orders);
    const [params, setParams] = useState<ParamsAPIProps>({
        page: paramsAPI.page,
        pageSize: paramsAPI.pageSize,
        sortBy: paramsAPI.sortBy,
        sortOrder: paramsAPI.sortOrder,
    });

    useEffect(() => {
        if (router.isReady) {
            if (typeof p === 'string') {
                setParams((prev) => ({
                    ...prev,
                    page: parseInt(p),
                }));
            } else {
                setParams((prev) => ({
                    ...prev,
                    page: 1,
                }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [p]);

    useEffect(() => {
        onChangeParamsAPI(params);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const [paginationInfo, setPaginationInfo] = useState<PaginationInfoProps>();
    const onChangePageTable = (value: number) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, p: value },
        });
    };

    const onChangePageSizeTable = (value: string) => {
        localStorage.setItem('pageSize', value);
        setParams((prev) => ({
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
        setParams((prev) => ({
            ...prev,
            sortBy,
            sortOrder,
        }));

        // onChangeParamsAPI({
        //     ...params,
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
