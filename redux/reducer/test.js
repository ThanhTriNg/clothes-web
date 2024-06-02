const cartItems = [
  { product: { id: 1, name: "Shirt" }, qty: 2, size: "M" },
  { product: { id: 2, name: "Pants" }, qty: 1, size: "L" },
  { product: { id: 1, name: "Shirt" }, qty: 3, size: "L" },
  { product: { id: 3, name: "Jacket" }, qty: 1, size: "M" },
];

const result = cartItems.filter(
  (item) => !(item.product.id === 1 && item.size=== "M")
);

console.log("result>>>", result);
// Expected output: Array ["exuberant", "destruction", "present"]
