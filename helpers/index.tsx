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
