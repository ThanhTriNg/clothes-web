import { CartItemDbProps, CartItemProps } from '@/redux/module';

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
const fetchProductById = async (productId: number | string) => {
    const response = await fetch(`http://localhost:5000/api/v1/clothes/${productId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product details');
    }
    return response.json();
};

export const convertDbCartToLocalCart = async (dbCart: CartItemDbProps[]) => {
    const localCart = [];
    for (const dbItem of dbCart) {
        const product = await fetchProductById(dbItem.productId);

        const localItem = {
            product: product.data,
            qty: dbItem.quantity,
            size: dbItem.size,
            color: dbItem.color,
        };

        localCart.push(localItem);
    }

    return localCart;
};
