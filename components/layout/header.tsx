import { useMediaQuery } from '@/hook/use-media-query';
import {
    addDbToLocalThunk,
    addOrUpdateCartItemThunk,
    clearCart,
    getCartThunk,
    getIsOpenDrawerCart,
    mergeCartThunk,
} from '@/redux/reducer/Cart';
import { User } from '@phosphor-icons/react';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DrawerMenu from '../drawerMenu';
import Cart from './cart';
import Nav from './nav';
import Search from './searchBtn';
import { updatedCartItems } from '@/components/AddToCartBtn';
import { useCartItems, useTotalItems } from '@/components/hook/';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { CartDbProps, CartItemProps, CategoriesProps } from '@/redux/module';
import { getCategoriesThunk } from '@/redux/reducer/Categories';
import { logOut } from '@/redux/reducer/User';
import { AppDispatch, RootState, persistor } from '@/redux/store/Store';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
    token: string | undefined;
}
const Header = ({ token }: HeaderProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const totalItems = useTotalItems();
    const cartItems = useCartItems();
    const isMobile = useMediaQuery('(max-width:767px)');
    const { cartDb } = useSelector((state: RootState) => state.cartPersistedReducer);
    const { categoriesInfo } = useSelector((state: RootState) => state.categories);

    const [womenCate, setWomenCate] = useState<CategoriesProps[]>();
    const [menCate, setMenCate] = useState<CategoriesProps[]>();
    const [onOpenDropMenu, setOnOpenDropMenu] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [cartActive, setCartActive] = useState(false);
    const [sortCartItems, setSortCartItems] = useState<CartItemProps[]>();
    useEffect(() => {
        if (isOpen === true) {
            setIsOpen(false);
        }
    }, [router]);

    useEffect(() => {
        if (!!totalItems == false) {
            if (isOpen === true) {
                setIsOpen(false);
            }
            const timeoutId = setTimeout(() => {
                setCartActive(false);
            }, 510);
            return () => clearTimeout(timeoutId);
        } else {
            setCartActive(true);
        }
    }, [isOpen, totalItems]);

    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    // store status open of drawer cart
    useEffect(() => {
        dispatch(getIsOpenDrawerCart(isOpen));
    }, [isOpen, dispatch]);

    //sign out
    const handleLogOut = () => {
        dispatch(logOut());
        dispatch(clearCart());
        toast.success('Signed out successfully');
        const timeoutId = setTimeout(() => {
            window.location.reload();
        }, 200);
        return () => clearTimeout(timeoutId);
    };

    useEffect(() => {
        if (categoriesInfo) {
            const womenCategories = categoriesInfo.filter((item) => item.gender === 'both' || item.gender === 'female');
            const menCategories = categoriesInfo.filter((item) => item.gender === 'both' || item.gender === 'male');
            setWomenCate(womenCategories);
            setMenCate(menCategories);
        }
    }, [categoriesInfo]);

    useEffect(() => {
        if (cartItems) {
            const sorted = [...cartItems].sort((a, b) => a.product.id - b.product.id);
            setSortCartItems(sorted);
        }
    }, [cartItems]);

    useEffect(() => {
        if (token) {
            dispatch(getCartThunk());
        }
    }, [dispatch, token]);

    useEffect(() => {
        handleMergeCart(cartDb, cartItems, token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartDb, dispatch, token]);

    useEffect(() => {
        if (token) {
            const debounceTime = 300;
            const timer = setTimeout(() => {
                const update = updatedCartItems(cartItems);
                dispatch(addOrUpdateCartItemThunk(update));
            }, debounceTime);

            return () => clearTimeout(timer);
        }
    }, [cartItems, dispatch, token]);
    useEffect(() => {
        setOnOpenDropMenu(false);
    }, [router]);

    const handleMergeCart = async (cartDb: CartDbProps[], cartItems: CartItemProps[], token: string | undefined) => {
        if (cartDb[0] && token) {
            const hasMerged = localStorage.getItem('hasMergedCart');
            if (!hasMerged && token && cartDb[0].Cart_items && cartDb[0].Cart_items.length > 0) {
                await dispatch(mergeCartThunk({ dbCart: cartDb[0].Cart_items, localStorageCart: cartItems }));
                localStorage.setItem('hasMergedCart', 'true');
            }
            if (hasMerged) {
                await dispatch(addDbToLocalThunk({ dbCart: cartDb[0].Cart_items, localStorageCart: cartItems }));
            }
        }
    };
    return (
        <header className="h-auto md:h-20 mb-4 sticky top-0 z-20 bg-white shadow-md shadow-slate-300 xl:px-8 md:px-6 p-4">
            <div className="md:flex justify-between items-center h-full xl:max-w-[1300px] mx-auto">
                <div className="md:flex md:gap-x-10 space-y-4">
                    <Link href="/" className="">
                        <Image src="/svg/logo.svg" className="mx-auto" alt="logo" width={50} height={50} />
                    </Link>
                    {menCate &&
                        womenCate &&
                        (isMobile ? (
                            <DrawerMenu
                                className="text-center"
                                menCate={menCate}
                                womenCate={womenCate}
                                genderInfo={genderInfo}
                            />
                        ) : (
                            <Nav className="mx-auto" menCate={menCate} womenCate={womenCate} genderInfo={genderInfo} />
                        ))}
                </div>
                <div className="flex md:gap-x-10 gap-x-2 items-center md:justify-center justify-around">
                    <Search />
                    {token ? (
                        <DropdownMenu open={onOpenDropMenu} onOpenChange={setOnOpenDropMenu}>
                            <DropdownMenuTrigger>
                                <User size={24} className="cursor-pointer" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="/user">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/">Billing</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <User size={24} className="cursor-pointer" />
                        </Link>
                    )}
                    {cartActive ? (
                        <div className="relative ">
                            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                                <DrawerTrigger>
                                    <ShoppingCart size={24} className="cursor-pointer" />
                                    {!!totalItems && (
                                        <div
                                            key={totalItems}
                                            className="select-none text-white bg-primary rounded-full w-6 text-center absolute -top-2 -right-3 animate-pingOnce "
                                        >
                                            {totalItems}
                                        </div>
                                    )}
                                    <DrawerContent className=" max-h-[80vh]">
                                        <div className="overflow-y-scroll overflow-x-hidden">
                                            {sortCartItems?.map((item, idx: number) => {
                                                return <Cart key={`cart-item-${idx}`} cartItem={item} />;
                                            })}
                                            <Link href="/cart" className="md:w-[40vw] w-[80vw] block mx-auto pb-3">
                                                <p className="text-center bg-primary mt-2 mb-1 p-2 rounded-md text-white hover:scale-105">
                                                    Đến giỏ hàng
                                                </p>
                                            </Link>
                                        </div>
                                    </DrawerContent>
                                </DrawerTrigger>
                            </Drawer>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
export const filterData = (cate: any, subCate: any) => {
    const filter = cate.map((item1: any) => {
        const data = subCate?.filter((item2: any) => item2.categoryId === item1.id);
        return data;
    });
    return filter;
};

const genderInfo = [
    {
        name: 'Women',
    },
    {
        name: 'Men',
    },
];
