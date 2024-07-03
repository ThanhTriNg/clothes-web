import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { ListChecks, Cardholder, Hoodie, ChartBar } from '@phosphor-icons/react';
import React from 'react';

import { useRouter } from 'next/router';

interface SideBarProps {
    className?: string;
}

const handleClickIcon = (e: any) => {
    e.preventDefault();
    console.log('test');
};

const SideBar = ({ className }: SideBarProps) => {
    const router = useRouter();
    return (
        <div className={`${className} space-y-4 p-2 rounded-xl `}>
            {/* {sideBarInfo.map((item, idx) => {
                return (
                    <div className="p-2 rounded-xl" key={`item-${idx}`}>
                        <nav className="">
                                <Link href={item.href} className="flex items-center text-lg gap-x-2 ">
                                    {item.icon}
                                    <p>{item.name}</p>
                                    {item.sub?.map((subItem, subIdx) => (
                                        <Link href={subItem.href} key={`${subIdx}-subLinkAdmin`}>
                                            <p className="text-sm font-medium p-3 rounded-xl hover:bg-primary hover:text-white">
                                                {subItem.name}
                                            </p>
                                        </Link>
                                    ))}
                                </Link>
                        </nav>
                    </div>
                );
            })} */}
            <nav className="">
                {sideBarInfo.map((item, idx) => {
                    const baseUrl = 'admin';
                    const borderWidth = 10;
                    return (
                        <Link
                            href={`/${baseUrl}/${item.href}`}
                            className=" p-2 flex items-center text-lg group relative"
                            key={`item-${idx}`}
                        >
                            <p className="flex flex-1 items-center text-base gap-x-2 font-medium p-3 rounded-xl hover:bg-primary hover:text-white">
                                {item.icon}
                                {item.name}
                            </p>
                            <div
                                className="absolute top-0 left-full z-20 bg-[#E7E9EB] animate-accordion-up invisible rounded-xl p-2 shadow-2xl
                            group-hover:visible"
                            >
                                <div
                                    style={{
                                        borderTop: `${borderWidth}px solid transparent`,
                                        borderBottom: `${borderWidth}px solid transparent`,
                                        borderRight: `${borderWidth * 2}px solid #E7E9EB`,
                                    }}
                                    className="absolute top-4 left-0 -translate-x-3/4"
                                />
                                {item.sub?.map((subItem, subIdx) => (
                                    <Link
                                        href={`/${baseUrl}/${item.href}/${subItem.href}`}
                                        key={`${subIdx}-subLinkAdmin`}
                                        className=""
                                    >
                                        <p className="text-sm font-medium p-3 rounded-xl hover:bg-primary hover:text-white">
                                            {subItem.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default SideBar;

const sideBarInfo = [
    {
        name: 'Analytics',
        href: 'admin',
        icon: <ChartBar />,
        sub: [
            { name: 'Add', href: 'add' },
            {
                name: 'Update',
                href: 'update',
            },
        ],
    },
    {
        name: 'Orders',
        href: 'orders',
        icon: <ListChecks />,
        sub: [
            { name: 'Add', href: 'add' },
            {
                name: 'Update',
                href: 'update',
            },
        ],
    },
    {
        name: 'Clothes',
        href: 'clothes',
        icon: <Hoodie />,
        sub: [
            { name: 'Add', href: 'add' },
            {
                name: 'Update',
                href: 'update',
            },
        ],
    },
    {
        name: 'Categories',
        href: 'categories',
        icon: <Cardholder />,
        sub: [
            { name: 'Add', href: 'add' },
            {
                name: 'Update',
                href: 'update',
            },
        ],
    },
];
<Cardholder size={32} />;
