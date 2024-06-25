import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { ListChecks, Cardholder, Hoodie ,ChartBar} from '@phosphor-icons/react';
import React from 'react';

interface SideBarProps {
    className?: string;
}

const SideBar = ({ className }: SideBarProps) => {
    return (
        <div className={`${className} space-y-4 p-2 rounded-xl `}>
            {sideBarInfo.map((item, idx) => {
                return (
                    <Link
                        href={item.href}
                        key={`item-${idx}`}
                        className="flex items-center justify-between py-3 px-2 hover:bg-primary rounded-xl"
                    >
                        <div className="flex items-center gap-x-4">
                            {React.cloneElement(item.icon, { size: 28 })}
                            <p className="font-bold"> {item.name} </p>
                        </div>
                        <ArrowRight size={16} className="text-right" />
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;

const sideBarInfo = [
    {
        name: 'Analytics',
        href: '/admin/',
        icon: <ChartBar />,
    },
    {
        name: 'Orders',
        href: '/admin/orders',
        icon: <ListChecks />,
    },
    {
        name: 'Clothes',
        href: '/admin/clothes',
        icon: <Hoodie />,
    },
    {
        name: 'Categories',
        href: '/admin/categories',
        icon: <Cardholder />,
    },
];
<Cardholder size={32} />;
