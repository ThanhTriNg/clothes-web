import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { ListChecks, Cardholder, Hoodie, ChartBar } from '@phosphor-icons/react';
import React from 'react';

import { useRouter } from 'next/router';

interface SideBarProps {
    className?: string;
}

const handleClickIcon = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            <nav className="space-y-2">
                {sideBarInfo.map((item, idx) => {
                    const borderWidth = 6;
                    return (
                        <Link
                            // href={`/${baseUrl}/${item.href}`}
                            href={item.href}
                            className="p-1 flex items-center text-lg group relative rounded-tl-xl rounded-bl-xl hover:bg-primary hover:text-white"
                            key={`item-${idx}`}
                        >
                            <p className="flex flex-1 items-center text-base gap-x-2 font-medium p-2 h-10">
                                {item.icon}
                                {item.name}
                            </p>
                            {item.sub && (
                                // absolute top-0 left-full z-20 animate-accordion-up shadow-2xl invisible group-hover:visible
                                <div className="absolute top-0 left-full z-20 animate-accordion-up shadow-2xl invisible group-hover:visible">
                                    {/* arrow */}
                                    {/* <div
                                        style={{
                                            borderTop: `${borderWidth}px solid transparent`,
                                            borderBottom: `${borderWidth}px solid transparent`,
                                            borderRight: `${borderWidth * 2}px solid hsl(var(--primary))`,
                                            // borderRight: `${borderWidth * 2}px solid #000`,
                                        }}
                                        className="absolute top-1 -left-1 -translate-x-1/2  "
                                    />
                                    <div className="h-16 w-9 bg-transparent absolute top-1/3 -left-1/2 -translate-y-1/2" /> */}
                                    <div className="bg-primary rounded-tr-xl rounded-br-xl">
                                        {item.sub?.map((subItem, subIdx) => (
                                            <Link
                                                // href={`/${baseUrl}/${item.href}/${subItem.href}`}

                                                href={`${item.href}/${subItem.href}`}
                                                key={`${subIdx}-subLinkAdmin`}
                                                className="first:rounded-tr-xl last:rounded-br-xl h-12 text-center grid justify-center items-center px-4 text-sm text-black hover:text-white font-medium bg-white hover:bg-primary"
                                            >
                                                <p>{subItem.name}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default SideBar;

const baseUrlAdmin = '/admin';

const sideBarInfo = [
    {
        name: 'Analytics',
        href: baseUrlAdmin,
        icon: <ChartBar />,
    },
    {
        name: 'Orders',
        href: `${baseUrlAdmin}/orders`,
        icon: <ListChecks />,
        sub: [{ name: 'Export', href: '/export' }],
    },
    {
        name: 'Clothes',
        href: `${baseUrlAdmin}/clothes`,
        icon: <Hoodie />,
        sub: [{ name: 'Add', href: '/add' }],
    },
    {
        name: 'Categories',
        href: `${baseUrlAdmin}/categories`,
        icon: <Cardholder />,
        sub: [{ name: 'Add', href: 'add' }],
    },
];
