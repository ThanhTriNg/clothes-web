import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import { columnsClothes } from '@/pages/admin/clothes/column';
import { columnsOrder } from '@/pages/admin/orders/column';
import { deleteClothesByIdThunk, getClothesThunk } from '@/redux/reducer/Clothes';
import { getOrderAdminThunk } from '@/redux/reducer/Order';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface AdminOrderProps {
    token: string;
}
const AdminOrders = ({ token }: AdminOrderProps) => {
    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    const { orderInfo } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(getOrderAdminThunk());
    }, [dispatch]);

    //
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfoProps>();
    const onChangePageTable = (value: number) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, p: value },
        });
    };
    const pageSizeLocal = localStorage.getItem('pageSize');

    const [pageSize, setPageSize] = useState<number>(
        typeof pageSizeLocal === 'string' ? parseInt(pageSizeLocal) : pagePerRow[0],
    );
    const onChangePageSizeTable = (value: string) => {
        setPageSize(parseInt(value));
        localStorage.setItem('pageSize', value);
    };

    useEffect(() => {
        if (orderInfo) {
            console.log('orderInfo>>', orderInfo);
        }
    }, [orderInfo]);

    return (
        <AdminLayout token={token}>
            {orderInfo && (
                <div className="mx-auto ">
                    <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
                        <DataTable
                            columns={columnsOrder}
                            data={orderInfo}
                            paginationInfo={paginationInfo}
                            onChangePageTable={onChangePageTable}
                            onChangePageSizeTable={onChangePageSizeTable}
                            pagePerRow={pagePerRow}
                        />
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminOrders;

export interface PaginationInfoProps {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
}
const pagePerRow = [4, 5, 6, 7, 8];
