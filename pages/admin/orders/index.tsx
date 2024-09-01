// import { DataTable } from '@/components/table';
// import { Button } from '@/components/ui/button';
// import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
// import { columnsClothes } from '@/pages/admin/clothes/column';
// import { columnsOrder } from '@/pages/admin/orders/column';
// import { SortValueType } from '@/redux/module';
// import { deleteClothesByIdThunk, getClothesThunk } from '@/redux/reducer/Clothes';
// import { getOrderAdminThunk } from '@/redux/reducer/Order';
// import { AppDispatch, RootState } from '@/redux/store/Store';
// import { useRouter } from 'next/router';
// import { useCallback, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// interface AdminOrderProps {
//     token: string;
// }
// interface ParamsAPIProps extends SortValueType {
//     page: number;
//     pageSize: number;
// }
// const AdminOrders = ({ token }: AdminOrderProps) => {
//     const router = useRouter();

//     const dispatch = useDispatch<AppDispatch>();
//     const pageSizeLocal = localStorage.getItem('pageSize');
//     const { p } = router.query;

//     const { orderAPI } = useSelector((state: RootState) => state.orders);
//     const [paramsAPI, setParamsAPI] = useState<ParamsAPIProps>({
//         page: NaN,
//         pageSize: typeof pageSizeLocal === 'string' ? parseInt(pageSizeLocal) : pagePerRow[0],
//         sortBy: 'createdAt',
//         sortOrder: 'DESC',
//     });

//     useEffect(() => {
//         console.log(paramsAPI);
//     }, [paramsAPI]);

//     useEffect(() => {
//         if (router.isReady) {
//             if (typeof p === 'string') {
//                 setParamsAPI((prev) => ({
//                     ...prev,
//                     page: parseInt(p),
//                 }));
//             } else {
//                 setParamsAPI((prev) => ({
//                     ...prev,
//                     page: 1,
//                 }));
//             }
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [p]);
//     useEffect(() => {
//         if (paramsAPI.page) {
//             dispatch(getOrderAdminThunk(paramsAPI));
//         }
//     }, [dispatch, paramsAPI]);

//     const [paginationInfo, setPaginationInfo] = useState<PaginationInfoProps>();
//     const onChangePageTable = (value: number) => {
//         router.push({
//             pathname: router.pathname,
//             query: { ...router.query, p: value },
//         });
//     };

//     const [pageSize, setPageSize] = useState<number>(
//         typeof pageSizeLocal === 'string' ? parseInt(pageSizeLocal) : pagePerRow[0],
//     );

//     const onChangePageSizeTable = (value: string) => {
//         localStorage.setItem('pageSize', value);
//         setParamsAPI((prev) => ({
//             ...prev,
//             pageSize: parseInt(value),
//         }));
//     };
//     useEffect(() => {
//         if (orderAPI) {
//             const { currentPage, pageSize, totalPages, totalCount } = orderAPI;
//             setPaginationInfo({ currentPage, pageSize, totalPages, totalCount });
//         }
//     }, [orderAPI]);

//     const handleSort = (sortBy: string, sortOrder: 'ASC' | 'DESC' | undefined) => {
//         setParamsAPI((prev) => ({
//             ...prev,
//             sortBy,
//             sortOrder,
//         }));
//     };
//     return (
//         <AdminLayout token={token}>
//             {orderAPI && (
//                 <div className="mx-auto ">
//                     <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
//                         <DataTable
//                             columns={columnsOrder}
//                             data={orderAPI.data}
//                             paginationInfo={paginationInfo}
//                             onChangePageTable={onChangePageTable}
//                             onChangePageSizeTable={onChangePageSizeTable}
//                             pagePerRow={pagePerRow}
//                             onSortChange={(sortBy, sortOrder) => {
//                                 handleSort(sortBy, sortOrder);
//                             }}
//                         />
//                     </div>
//                 </div>
//             )}
//         </AdminLayout>
//     );
// };

// export default AdminOrders;

// export interface PaginationInfoProps {
//     currentPage: number;
//     pageSize: number;
//     totalPages: number;
//     totalCount: number;
// }
// const pagePerRow = [4, 5, 6, 7, 8];

import LayoutTableAdmin, { pagePerRow } from '@/components/admin/(layoutTableAdmin)/layout';
import { columnsOrder } from '@/pages/admin/orders/column';
import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import { columnsClothes } from '@/pages/admin/clothes/column';
import { PaginationProps, SortValueType } from '@/redux/module';
import { deleteClothesByIdThunk, getClothesThunk } from '@/redux/reducer/Clothes';
import { getOrderAdminThunk } from '@/redux/reducer/Order';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnDef, orderColumns } from '@tanstack/react-table';
import OrderApi from '@/redux/api/OrderApi';

interface AdminOrderProps {
    token: string;
}
interface ParamsAPIProps extends SortValueType {
    page: number;
    pageSize: number;
}
const AdminOrders = ({ token }: AdminOrderProps) => {
    const { orderAPI } = useSelector((state: RootState) => state.orders);
    useEffect(() => {
        console.log('orderAPI>>', orderAPI);
    }, [orderAPI]);
    const pageSizeLocal = localStorage.getItem('pageSize');
    const router = useRouter();

    const { p } = router.query;
    const dispatch = useDispatch<AppDispatch>();

    const [paramsAPI, setParamsAPI] = useState<ParamsAPIProps>({
        page: 1,
        pageSize: typeof pageSizeLocal === 'string' ? parseInt(pageSizeLocal) : pagePerRow[0],
        sortBy: 'createdAt',
        sortOrder: 'DESC',
    });
    // console.log('paramsAPI>>', paramsAPI);
    // useEffect(() => {
    //     if (router.isReady) {
    //         if (typeof p === 'string') {
    //             setParamsAPI((prev) => ({
    //                 ...prev,
    //                 page: parseInt(p),
    //             }));
    //         } else {
    //             setParamsAPI((prev) => ({
    //                 ...prev,
    //                 page: 1,
    //             }));
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [p]);

    // useEffect(() => {
    //     if (paramsAPI.page) {
    //         dispatch(getOrderAdminThunk(paramsAPI));
    //     }
    // }, [dispatch, paramsAPI]);

    const [previousParamsAPI, setPreviousParamsAPI] = useState<ParamsAPIProps>(paramsAPI);
    const isFirstRender = useRef(true);
    useEffect(() => {
        console.log(
            'JSON.stringify(paramsAPI) !== JSON.stringify(previousParamsAPI)>>',
            JSON.stringify(paramsAPI) !== JSON.stringify(previousParamsAPI),
        );

        if (isFirstRender.current || JSON.stringify(paramsAPI) !== JSON.stringify(previousParamsAPI)) {
            console.log('paramsAPI>>', paramsAPI);
            dispatch(getOrderAdminThunk(paramsAPI));
            setPreviousParamsAPI(paramsAPI);
            isFirstRender.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, paramsAPI]);
    const onChangeParamsAPI = (value: ParamsAPIProps) => {
        setParamsAPI(value);
    };
    const [paginationAPI, setPaginationAPI] = useState<PaginationProps>();
    useEffect(() => {
        //   setPaginationAPI((prev) => ({
        //                 ...prev,

        //             }));
        if (orderAPI) {
            setPaginationAPI({
                currentPage: orderAPI.currentPage,
                pageSize: orderAPI.pageSize,
                totalCount: orderAPI.totalCount,
                totalPages: orderAPI.totalPages,
            });
        }
    }, [orderAPI]);

    return (
        orderAPI &&
        paginationAPI && (
            <LayoutTableAdmin
                token={token}
                dataAPI={orderAPI.data}
                paginationAPI={paginationAPI}
                columns={columnsOrder}
                paramsAPIs={paramsAPI}
                onChangeParamsAPI={onChangeParamsAPI}
            />
        )
    );
};

export default AdminOrders;
