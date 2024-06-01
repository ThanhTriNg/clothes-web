export const JSONparse = (string: string) => {
  while (typeof string === "string") {
    string = JSON.parse(string);
  }
  return string;
};

export const formatPrice = (price: number, discount: number = 0) => {
  const discountP: number = discount / 100;
  const priceDiscount: number = price * (1 - discountP);

  const convertPrice: string = price.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  const convertPriceDiscount: string = priceDiscount.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return { convertPrice, convertPriceDiscount };
};
