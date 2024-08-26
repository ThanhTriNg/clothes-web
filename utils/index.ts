import { CartItemDbProps, CartItemProps, ClothesProps, ClothesPropsData } from '@/redux/module';

interface ProductPromiseProps {
    message: string;
    data: ClothesPropsData;
}

export const JSONparse = (string: string) => {
    while (typeof string === 'string') {
        string = JSON.parse(string);
    }
    return string;
};

export const formatPrice = (price: number, discount: number = 0) => {
    const discountP: number = discount / 100;
    const priceDiscount: number = price * (1 - discountP);

    const convertPrice: string = price.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
    });

    const convertPriceDiscount: string = priceDiscount.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
    });
    return { convertPrice, convertPriceDiscount };
};

export const obscureEmail = (email: string | undefined) => {
    if (email) {
        const atIndex = email.indexOf('@');
        const domain = email.substring(atIndex);
        const localPart = email.substring(0, atIndex);
        const sliceNumber = Math.floor(localPart.length / 4);

        const obfuscatedUsername =
            localPart.slice(0, sliceNumber) +
            '*'.repeat(localPart.length - sliceNumber * 2) +
            localPart.slice(-sliceNumber);
        return obfuscatedUsername + domain;
    } else {
        return 'aasd';
    }
};

export const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem('persist:cart');
    if (cart) {
        const cartParse = JSON.parse(cart);
        const cartItems = JSON.parse(cartParse.cartItems);
        return cartItems;
    } else {
        return [];
    }
};

// export const mergeCarts = (dbCart: any, localStorageCart: any) => {
//     const mergedCart = [...dbCart];
//     console.log('dbCart>>', dbCart);
//     console.log('localStorageCart>>', localStorageCart);
//     localStorageCart.forEach((localItem: any) => {
//         console.log('localItem>>', localItem.product.id);
//         const existingItem = mergedCart.find((dbItem) => {
//             console.log('chay vo day');
//             return (
//                 dbItem.productId === localItem.product.id &&
//                 dbItem.size === localItem.size &&
//                 dbItem.color === localItem.color
//             );
//         });
//         console.log('existingItem.quantity>>', existingItem.quantity);
//         console.log('localItem.qty>>', localItem.qty);

//         //Cannot assign to read only property 'quantity' of object '#<Object>'
//         if (existingItem) {
//             existingItem.quantity += localItem.qty;
//         } else {
//             mergedCart.push(localItem);
//         }
//     });

//     return mergedCart;
// };

export const mergeCarts = (localDbCart: CartItemProps[], localStorageCart: CartItemProps[]) => {
    const mergedCart = [...localDbCart];
    // console.log('dbCart', dbCart);
    // console.log('mergeCartCopy', mergeCart);
    localStorageCart.forEach((localItem: any) => {
        const existingItemIndex = mergedCart.findIndex((dbItem) => {
            return (
                dbItem.product.id === localItem.product.id &&
                dbItem.size === localItem.size &&
                dbItem.color === localItem.color
            );
        });

        if (existingItemIndex !== -1) {
            mergedCart[existingItemIndex].qty += localItem.qty;
        } else {
            mergedCart.push(localItem);
        }
    });
    // console.log('mergedCart>>>', mergedCart);
    return mergedCart;
};

export const addDbToLocal = (localDbCart: CartItemProps[], localStorageCart: CartItemProps[]) => {
    // Clear the local storage cart
    localStorageCart = [];

    // Add items from the database cart to the local storage cart
    localDbCart.forEach((dbItem) => {
        localStorageCart.push(dbItem);
    });
    return localStorageCart;
};

const fetchProductById = async (productId: number | string) => {
    const response = await fetch(`http://localhost:5000/api/v1/clothes/${productId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product details');
    }
    return response.json();
};

export const uniqueProduct = async (dbCart: CartItemDbProps[]) => {
    const uniqueProductIdsObj: { [key: string]: boolean } = {};
    for (let i = 0; i < dbCart.length; i++) {
        uniqueProductIdsObj[dbCart[i].productId] = true;
    }
    // Convert the object keys into an array of unique product IDs
    const uniqueProductIds = Object.keys(uniqueProductIdsObj).map(Number);
    const productFetchPromises = uniqueProductIds.map((productId) => {
        return fetchProductById(productId);
    });
    const products: ProductPromiseProps[] = await Promise.all(productFetchPromises);
    // Create a map of productId to product details for quick lookup
    const productMap: { [key: number]: ClothesPropsData } = {};
    products.forEach((product) => {
        productMap[product.data.id] = product.data;
    });
    return productMap;
};

export const convertDbCartToLocalCart = async (dbCart: CartItemDbProps[]) => {
    const productMap = await uniqueProduct(dbCart);
    const localCart = dbCart.map((dbItem) => ({
        product: productMap[dbItem.productId],
        qty: dbItem.quantity,
        size: dbItem.size,
        color: dbItem.color,
    }));

    return localCart;
};

const convertDate = (date: Date) => {
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return { day, month, year, hours, minutes };
};

export const convertDateUTC7 = (date: Date) => {
    const offsetHours = 7;
    const utc7Date = new Date(date.getTime() + offsetHours * 60 * 60 * 1000);

    const { day, month, year, hours, minutes } = convertDate(utc7Date);

    return { utc7Date, day, month, year, hours, minutes };
};

export const convertDateDelivery = (date: Date) => {
    const { utc7Date } = convertDateUTC7(date);
    const days: number = parseInt(process.env.NEXT_PUBLIC_DELIVERY_DAYS as string);
    const daysLater = new Date(utc7Date.getTime() + days * 24 * 60 * 60 * 1000);

    const { day, month, year, hours, minutes } = convertDate(daysLater);

    return { day, month, year, hours, minutes };
};
