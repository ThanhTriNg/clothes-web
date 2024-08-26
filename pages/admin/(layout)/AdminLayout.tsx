import Header from '@/pages/admin/(layout)/Header';
import SideBar from '@/pages/admin/(layout)/SideBar';
import { getUserThunk } from '@/redux/reducer/User';
import { AppDispatch, RootState } from '@/redux/store/Store';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface AdminLayoutProps {
    token: string;
    children: ReactNode;
}
const AdminLayout = ({ token, children }: AdminLayoutProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { userInfo } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (token) {
            dispatch(getUserThunk());
        }
    }, [dispatch, token]);

    return userInfo && userInfo.roleCode === 'TA' ? (
        <div className="">
            <Header userInfo={userInfo} />
            <div className="mt-6 grid grid-cols-12 space-x-14 min-h-[calc(100vh-96px-24px)]">
                <SideBar className="col-span-2 bg-white" />
                {/* <  <Content className="col-span-10" />> */}
                {/* {renderContent()} */}
                <div className="col-span-10 bg-white  p-6 rounded-xl ">{children}</div>
            </div>
        </div>
    ) : (
        <Error statusCode={404} />
    );
};

export default AdminLayout;
