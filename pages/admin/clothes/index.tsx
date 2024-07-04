import { DataTable } from '@/components/table';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import { ClothesPropsData, SubCateProps } from '@/redux/module';
import { deleteClothesByIdThunk, getClothesThunk } from '@/redux/reducer/Clothes';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { columnsClothes } from '@/pages/admin/clothes/column';
import { Button } from '@/components/ui/button';
interface AdminClothesProps {
    token: string;
}
const RenderRowActions = (row: ClothesPropsData) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleClickEdit = (row: ClothesPropsData) => {
        console.log(`Editing row with id ${row.id}`);
    };
    const handleClickDelete = async (row: ClothesPropsData) => {
        console.log(`Delete row with id ${row.id}`);
        
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

const AdminClothes = ({ token }: AdminClothesProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const { clothesInfo } = useSelector((state: RootState) => state.clothes);
    useEffect(() => {
        dispatch(getClothesThunk('0'));
    }, [dispatch]);

    return (
        <AdminLayout token={token}>
            {clothesInfo && (
                <div className="mx-auto ">
                    <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
                        <DataTable
                            columns={columnsClothes}
                            data={clothesInfo.data}
                            renderRowActions={RenderRowActions}
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
