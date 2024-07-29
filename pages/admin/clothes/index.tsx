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

export interface PaginationInfoProps {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
}
const pagePerRow = [4, 5, 6, 7, 8];
const AdminClothes = ({ token }: AdminClothesProps) => {
    const router = useRouter();
    const { p } = router.query;

    const pageSizeLocal = localStorage.getItem('pageSize');

    const dispatch = useDispatch<AppDispatch>();
    const [pageSize, setPageSize] = useState<number>(
        typeof pageSizeLocal === 'string' ? parseInt(pageSizeLocal) : pagePerRow[0],
    );
    const { clothesInfo } = useSelector((state: RootState) => state.clothes);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfoProps>();

    useEffect(() => {
        setIsChanged(false);
        if (typeof p === 'string') {
            dispatch(getClothesThunk({ sortValue: '0', page: parseInt(p), pageSize }));
        } else {
            dispatch(getClothesThunk({ sortValue: '0', page: 1, pageSize }));
        }
    }, [dispatch, p, pageSize, isChanged]);

    useEffect(() => {
        if (clothesInfo) {
            const { currentPage, pageSize, totalPages, totalCount } = clothesInfo;
            setPaginationInfo({ currentPage, pageSize, totalPages, totalCount });
        }
    }, [clothesInfo]);

    const onChangePageTable = (value: number) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, p: value },
        });
    };

    const onChangePageSizeTable = (value: string) => {
        setPageSize(parseInt(value));
        localStorage.setItem('pageSize', value);
    };
    const onDelete = (value: boolean) => {
        setIsChanged(value);
    };
    return (
        <AdminLayout token={token}>
            {clothesInfo && paginationInfo && (
                <div className="mx-auto ">
                    <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
                        <DataTable
                            columns={columnsClothes}
                            data={clothesInfo.data}
                            renderRowActions={(row) => <RenderRowActions row={row} onDelete={onDelete} />}
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

export default AdminClothes;
export const convertSubCategoriesToArray = (subCates: SubCateProps[]) => {
    return subCates.map((subCate) => subCate.name);
};

interface RenderRowActionsProps {
    row: ClothesPropsData;
    // setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
    onDelete: (value: boolean) => void;
}
const RenderRowActions: React.FC<RenderRowActionsProps> = ({ row, onDelete }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const handleClickEdit = (row: ClothesPropsData) => {
        router.push(`${router.asPath}/edit/${row.id}`);
    };
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
