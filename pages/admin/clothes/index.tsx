// import { DataTable } from '@/components/table';
// import { Button } from '@/components/ui/button';
// import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
// import { columnsClothes } from '@/pages/admin/clothes/column';
// import { ClothesPropsData, SortValueType, SubCateProps } from '@/redux/module';
// import { deleteClothesByIdThunk, getClothesThunk } from '@/redux/reducer/Clothes';
// import { AppDispatch, RootState } from '@/redux/store/Store';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// interface AdminClothesProps {
//     token: string;
// }

// export interface PaginationInfoProps {
//     currentPage: number;
//     pageSize: number;
//     totalPages: number;
//     totalCount: number;
// }
// const pagePerRow = [4, 5, 6, 7, 8];

// interface ParamsAPIProps extends SortValueType {
//     page: number;
//     pageSize: number;
// }
// const AdminClothes = ({ token }: AdminClothesProps) => {
//     const router = useRouter();
//     const { p } = router.query;

//     const pageSizeLocal = localStorage.getItem('pageSize');

//     const dispatch = useDispatch<AppDispatch>();

//     const { clothesInfo } = useSelector((state: RootState) => state.clothes);
//     const [isChanged, setIsChanged] = useState<boolean>(false);
//     const [paginationInfo, setPaginationInfo] = useState<PaginationInfoProps>();

//     const [paramsAPI, setParamsAPI] = useState<ParamsAPIProps>({
//         page: NaN,
//         pageSize: typeof pageSizeLocal === 'string' ? parseInt(pageSizeLocal) : pagePerRow[0],
//         sortBy: '',
//         sortOrder: undefined,
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
//             setIsChanged(false);

//             dispatch(getClothesThunk(paramsAPI));
//         }
//     }, [dispatch, paramsAPI, isChanged]);

//     useEffect(() => {
//         if (clothesInfo) {
//             const { currentPage, pageSize, totalPages, totalCount } = clothesInfo;
//             setPaginationInfo({ currentPage, pageSize, totalPages, totalCount });
//         }
//     }, [clothesInfo]);

//     const onChangePageTable = (value: number) => {
//         console.log('run here ?');
//         router.push({
//             pathname: router.pathname,
//             query: { ...router.query, p: value },
//         });
//     };

//     const onChangePageSizeTable = (value: string) => {
//         localStorage.setItem('pageSize', value);

//         setParamsAPI((prev) => ({
//             ...prev,
//             pageSize: parseInt(value),
//         }));
//     };
//     const onDelete = (value: boolean) => {
//         setIsChanged(value);
//     };
//     const handleSort = (sortBy: string, sortOrder: 'ASC' | 'DESC' | undefined) => {
//         setParamsAPI((prev) => ({
//             ...prev,
//             sortBy,
//             sortOrder,
//         }));
//     };

//     return (
//         <AdminLayout token={token}>
//             {clothesInfo && paginationInfo && (
//                 <div className="mx-auto ">
//                     <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
//                         <DataTable
//                             columns={columnsClothes}
//                             data={clothesInfo.data}
//                             renderRowActions={(row) => <RenderRowActions row={row} onDelete={onDelete} />}
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

// export default AdminClothes;
// export const convertSubCategoriesToArray = (subCates: SubCateProps[]) => {
//     return subCates.map((subCate) => subCate.name);
// };

// interface RenderRowActionsProps {
//     row: ClothesPropsData;
//     // setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
//     onDelete: (value: boolean) => void;
// }
// const RenderRowActions: React.FC<RenderRowActionsProps> = ({ row, onDelete }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const router = useRouter();
//     const handleClickEdit = (row: ClothesPropsData) => {
//         router.push(`${router.pathname}/edit/${row.id}`);
//     };
//     // console.log(router);
//     const handleClickDelete = async (row: ClothesPropsData) => {
//         const productId: string = row.id.toString();
//         const result = await dispatch(deleteClothesByIdThunk(productId));
//         if (deleteClothesByIdThunk.fulfilled.match(result)) {
//             onDelete(true);
//         } else {
//             // Handle error here
//             console.error('Failed to delete the item.');
//         }
//     };
//     return (
//         <div className="flex justify-center items-center gap-2">
//             <Button size="xs" className=" xl:h-10 xl:py-2 xl:px-4" onClick={() => handleClickEdit(row)}>
//                 Edit
//             </Button>
//             <Button size="xs" className=" xl:h-10 xl:py-2 xl:px-4" onClick={() => handleClickDelete(row)}>
//                 Delete
//             </Button>
//         </div>
//     );
// };

import LayoutTableAdmin, { pagePerRow } from '@/components/admin/(layoutTableAdmin)/layout';
import { columnsOrder } from '@/pages/admin/orders/column';
import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import { columnsClothes } from '@/pages/admin/clothes/column';
import { ClothesPropsData, PaginationProps, SortValueType } from '@/redux/module';
import { deleteClothesByIdThunk, getClothesThunk } from '@/redux/reducer/Clothes';
import { getOrderAdminThunk } from '@/redux/reducer/Order';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnDef, orderColumns } from '@tanstack/react-table';
import OrderApi from '@/redux/api/OrderApi';

interface AdminClothesProps {
    token: string;
}
interface ParamsAPIProps extends SortValueType {
    page: number;
    pageSize: number;
}
const AdminClothes = ({ token }: AdminClothesProps) => {
    const { clothesInfo } = useSelector((state: RootState) => state.clothes);

    const pageSizeLocal = localStorage.getItem('pageSize');

    const dispatch = useDispatch<AppDispatch>();

    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [paramsAPI, setParamsAPI] = useState<ParamsAPIProps>({
        page: 1,
        pageSize: typeof pageSizeLocal === 'string' ? parseInt(pageSizeLocal) : pagePerRow[0],
        sortBy: '',
        sortOrder: undefined,
    });
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
    const [previousParamsAPI, setPreviousParamsAPI] = useState<ParamsAPIProps>(paramsAPI);
    const isFirstRender = useRef(true);

    useEffect(() => {
        console.log(
            'JSON.stringify(paramsAPI) !== JSON.stringify(previousParamsAPI)>>',
            JSON.stringify(paramsAPI) !== JSON.stringify(previousParamsAPI),
        );

        if (isFirstRender.current || JSON.stringify(paramsAPI) !== JSON.stringify(previousParamsAPI)) {
            console.log('paramsAPI>>', paramsAPI);
            setIsChanged(false);
            dispatch(getClothesThunk(paramsAPI));
            setPreviousParamsAPI(paramsAPI);
            isFirstRender.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, paramsAPI, isChanged]);

    const onChangeParamsAPI = (value: ParamsAPIProps) => {
        setParamsAPI(value);
    };

    const [paginationAPI, setPaginationAPI] = useState<PaginationProps>();
    useEffect(() => {
        if (clothesInfo) {
            setPaginationAPI({
                currentPage: clothesInfo.currentPage,
                pageSize: clothesInfo.pageSize,
                totalCount: clothesInfo.totalCount,
                totalPages: clothesInfo.totalPages,
            });
        }
    }, [clothesInfo]);
    // console.log(clothesInfo);
    // console.log(paginationAPI);

    const onDelete = (value: boolean) => {
        setIsChanged(value);
    };
    return (
        clothesInfo &&
        paginationAPI && (
            <LayoutTableAdmin
                token={token}
                dataAPI={clothesInfo.data}
                paginationAPI={paginationAPI}
                columns={columnsClothes}
                paramsAPIs={paramsAPI}
                onChangeParamsAPI={onChangeParamsAPI}
                // renderRowActions={RenderRowActions}
                renderRowActions={(row) => <RenderRowActions row={row} onDelete={onDelete} />}
            />
        )
    );
};

export default AdminClothes;

interface RenderRowActionsProps {
    row: ClothesPropsData;
    // setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
    onDelete: (value: boolean) => void;
}
const RenderRowActions: React.FC<RenderRowActionsProps> = ({ row, onDelete }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const handleClickEdit = (row: ClothesPropsData) => {
        router.push(`${router.pathname}/edit/${row.id}`);
    };
    // console.log(router);
    const handleClickDelete = async (row: ClothesPropsData) => {
        const productId: string = row.id.toString();
        const result = await dispatch(deleteClothesByIdThunk(productId));
        if (deleteClothesByIdThunk.fulfilled.match(result)) {
            onDelete(true);
        } else {
            // Handle error here
            console.error('Failed to delete the item.');
        }
    };
    return (
        <div className="flex justify-center items-center gap-2">
            <Button size="xs" className=" xl:h-10 xl:py-2 xl:px-4" onClick={() => handleClickEdit(row)}>
                Edit
            </Button>
            <Button size="xs" className=" xl:h-10 xl:py-2 xl:px-4" onClick={() => handleClickDelete(row)}>
                Delete
            </Button>
        </div>
    );
};
// interface RenderRowActionsProps<TPropsData> {
//     row: TPropsData;
//     onDelete: (value: boolean) => void;
// }

// const RenderRowActions = <TPropsData extends { id: number }>({ row, onDelete }: RenderRowActionsProps<TPropsData>) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const router = useRouter();

//     const handleClickEdit = (row: TPropsData) => {
//         router.push(`${router.pathname}/edit/${row.id}`);
//     };

//     const handleClickDelete = async (row: TPropsData) => {
//         const productId: string = row.id.toString();
//         const result = await dispatch(deleteClothesByIdThunk(productId));
//         if (deleteClothesByIdThunk.fulfilled.match(result)) {
//             onDelete(true);
//         } else {
//             console.error('Failed to delete the item.');
//         }
//     };

//     return (
//         <div className="flex justify-center items-center gap-2">
//             <Button size="xs" className="xl:h-10 xl:py-2 xl:px-4" onClick={() => handleClickEdit(row)}>
//                 Edit
//             </Button>
//             <Button size="xs" className="xl:h-10 xl:py-2 xl:px-4" onClick={() => handleClickDelete(row)}>
//                 Delete
//             </Button>
//         </div>
//     );
// };
