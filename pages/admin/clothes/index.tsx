import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import { columnsClothes } from '@/pages/admin/clothes/column';
import { ClothesPropsData, SubCateProps } from '@/redux/module';
import { deleteClothesByIdThunk, getClothesThunk } from '@/redux/reducer/Clothes';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface AdminClothesProps {
    token: string;
}
const RenderRowActions = (row: ClothesPropsData) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const handleClickEdit = (row: ClothesPropsData) => {
        router.push(`${router.asPath}/edit/${row.id}`);
    };
    const handleClickDelete = async (row: ClothesPropsData) => {
        const productId: string = row.id.toString();
        await dispatch(deleteClothesByIdThunk(productId));
    };
    return (
        <div className="space-x-2">
            <Button onClick={() => handleClickEdit(row)}>Edit</Button>
            <Button onClick={() => handleClickDelete(row)}>Delete</Button>
        </div>
    );
};
export interface PaginationInfoProps {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
}
const AdminClothes = ({ token }: AdminClothesProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);

    const { clothesInfo } = useSelector((state: RootState) => state.clothes);

    useEffect(() => {
        dispatch(getClothesThunk({ sortValue: '0', page, pageSize }));
    }, [dispatch, page, pageSize]);

    const [paginationInfo, setPaginationInfo] = useState<PaginationInfoProps>();

    useEffect(() => {
        if (clothesInfo) {
            const { currentPage, pageSize, totalPages, totalCount } = clothesInfo;
            setPaginationInfo({ currentPage, pageSize, totalPages, totalCount });
        }
    }, [clothesInfo]);

    const onChangePageTable = (value: number) => {
        setPage(value);
    };

    const onChangePageSizeTable = (value: string) => {
        setPageSize(parseInt(value));
    };
    return (
        <AdminLayout token={token}>
            {clothesInfo && paginationInfo && (
                <div className="mx-auto ">
                    <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
                        <DataTable
                            columns={columnsClothes}
                            data={clothesInfo.data}
                            renderRowActions={RenderRowActions}
                            paginationInfo={paginationInfo}
                            onChangePageTable={onChangePageTable}
                            onChangePageSizeTable={onChangePageSizeTable}
                        />
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminClothes;
export const convertSubCategoriesToArray = (subCates: SubCateProps[]) => {
    return subCates.map((subCate) => subCate.name);
};
