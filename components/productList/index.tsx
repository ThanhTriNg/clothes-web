import { ClothesProps } from "@/redux/module";
import Card from "../card";
import { useRouter } from "next/router";
interface ProductListProps {
  className?: string;
  products: ClothesProps[];
  categoriesInfo?: any;
}
const ProductList = ({
  className,
  products,
  categoriesInfo,
}: ProductListProps) => {
  // console.log(categoriesInfo);
  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-8">
        {products.map((item, idx: number) => {
          return (
            <Card
              key={`product-card-${idx}`}
              id={item.id}
              img={item.img}
              name={item.name}
              price={item.price}
              color={item.color}
              categoryId={item.categoryId}
              categoriesInfo={categoriesInfo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
