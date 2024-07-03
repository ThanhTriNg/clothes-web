import { DataTable } from '@/components/table';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import { ClothesPropsData, SubCateProps } from '@/redux/module';
import { getClothesThunk } from '@/redux/reducer/Clothes';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { columnsClothes } from '@/pages/admin/clothes/column';
interface AdminClothesProps {
    token: string;
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
                        <DataTable columns={columnsClothes} data={clothesInfo.data} />
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
