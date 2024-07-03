import Link from 'next/link';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { CategoriesProps } from '@/redux/module';
import React, { useEffect, useState } from 'react';
import { convertNameCate } from '../LimitedPromotion';
import { menuProps } from '@/components/layout/module';
import { NavigationMenuViewport } from '@radix-ui/react-navigation-menu';

const Nav = ({ className, menCate, womenCate, genderInfo }: menuProps) => {
    return (
        <NavigationMenu className={className} renderViewport={true}>
            <NavigationMenuList>
                {genderInfo?.map((item, idx: number) => {
                    let cate;
                    if (item.name === 'Women') {
                        cate = womenCate;
                    } else {
                        cate = menCate;
                    }

                    return (
                        <NavigationMenuItem key={`s-${idx}`}>
                            <NavigationMenuTrigger className="uppercase xl:text-base text-sm font-bold bg-bg-slate-200 ">
                                {item.name}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul
                                    className={`bg-white grid gap-2 p-6 lg:w-[800px] md:w-[80vw] ${
                                        idx === 0 ? ` grid-cols-4` : ` grid-cols-3`
                                    } md:text-base text-sm`}
                                >
                                    {cate?.map((item, idx) => {
                                        const cateName = item.name.toLowerCase();
                                        return (
                                            <div key={`clothes-${idx}`} className="space-y-3">
                                                <p className="font-semibold uppercase xl:text-base text-sm">
                                                    {item.name}
                                                </p>
                                                <div>
                                                    {item.Sub_Categories.map((itemSub, idx) => {
                                                        return (
                                                            <ListItem
                                                                href={`/store/${cateName}`}
                                                                className="capitalize"
                                                                key={`${item.name}-${idx}`}
                                                                title={itemSub.name}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Nav;

const ListItem = React.forwardRef<React.ElementRef<typeof Link>, React.ComponentPropsWithoutRef<typeof Link>>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        ref={ref}
                        className={cn(
                            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                            className,
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                    </Link>
                </NavigationMenuLink>
            </li>
        );
    },
);
ListItem.displayName = 'ListItem';
