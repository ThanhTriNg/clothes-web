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

export const mergeCarts = (dbCart: any, localStorageCart: any) => {
    console.log('dbCart>>', dbCart);
    const mergedCart = dbCart.map((item: any) => ({ ...item }));
    console.log('dbCart>>', dbCart);
    console.log('localStorageCart>>', localStorageCart);

    if (mergedCart) {
        localStorageCart.forEach((localItem: any) => {
            console.log('localItem>>', localItem.product.id);

            const existingItemIndex = mergedCart.findIndex((dbItem: any) => {
                console.log('chay vo day');
                return (
                    dbItem.productId === localItem.product.id &&
                    dbItem.size === localItem.size &&
                    dbItem.color === localItem.color
                );
            });

            if (existingItemIndex !== -1) {
                console.log('existingItem.quantity>>', mergedCart[existingItemIndex].quantity);
                console.log('localItem.qty>>', localItem.qty);

                // Creating a mutable copy of the existing item
                mergedCart[existingItemIndex] = {
                    ...mergedCart[existingItemIndex],
                    quantity: mergedCart[existingItemIndex].quantity + localItem.qty,
                };
            } else {
                mergedCart.push(localItem);
            }
        });
        return mergedCart;
    } else {
        return localStorageCart;
    }
};
