import { getUserThunk } from '@/redux/reducer/User';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '@/pages/admin/(layout)/AdminLayout';
import { ChartPie, ShoppingCart, BagSimple, ClockAfternoon } from '@phosphor-icons/react';
import CardAdmin from '@/components/admin/card';
import SummaryChart from '@/components/admin/summaryChart';
import BarChart from '@/components/admin/barChart';
import { TrendDown, TrendUp } from '@phosphor-icons/react';

interface AdminPageProps {
    token: string;
}
const AdminPage = ({ token }: AdminPageProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { userInfo } = useSelector((state: RootState) => state.users);

    const router = useRouter();
    useEffect(() => {
        if (token) {
            dispatch(getUserThunk());
        }
    }, [dispatch, token]);

    return (
        <AdminLayout token={token}>
            <h1 className="font-bold text-2xl">Analytics Dashboard</h1>
            <p>A collection of visualization showing your website data</p>
            <div className="grid grid-cols-10 gap-x-4 mt-2">
                <div className="col-span-4 grid grid-cols-2 gap-4">
                    {cardData.map((item, idx: number) => {
                        return (
                            <CardAdmin
                                key={idx}
                                icon={item.icon}
                                bgColor={item.bgColor}
                                number={item.number}
                                desc={item.desc}
                            />
                        );
                    })}
                </div>

                <div className="col-span-6 grid grid-cols-6">
                    <h2 className="font-bold text-xl col-span-full">Chart</h2>

                    <div className="col-span-full grid grid-cols-6">
                        <div className="col-span-2">
                            <SummaryChart title="Sales" value={9000} bgColor="red" icon={TrendDown} colorIcon="red" />
                            <SummaryChart title="Visits" value={6000} bgColor="blue" icon={TrendDown} colorIcon="red" />
                            <SummaryChart
                                title="Income"
                                value={5000}
                                bgColor="green"
                                icon={TrendUp}
                                colorIcon="green"
                            />
                            <SummaryChart
                                title="Revenue"
                                value={3000}
                                bgColor="yellow"
                                icon={TrendDown}
                                colorIcon="red"
                            />
                        </div>
                        <div className="col-span-4 bg-white p-4 rounded-lg shadow">
                            <BarChart />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminPage;

const cardData = [
    {
        icon: ChartPie,
        bgColor: '#434A95',
        number: 9600,
        desc: 'Weekly new visitors',
    },
    {
        icon: ShoppingCart,
        bgColor: '#7D0C9D',
        number: 9600,
        desc: 'Weekly new orders',
    },
    {
        icon: BagSimple,
        bgColor: '#FF4336',
        number: 9600,
        desc: 'Weekly income',
    },
    {
        icon: ClockAfternoon,
        bgColor: '#F9BE0D',
        number: 9600,
        desc: 'Weekly new views',
    },
];
