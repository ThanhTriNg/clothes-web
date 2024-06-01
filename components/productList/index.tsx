import { ClothesProps, ClothesPropsData } from "@/redux/module";
import Card from "../card";
import { useRouter } from "next/router";
interface ProductListProps {
  className?: string;
  products: ClothesPropsData[];
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
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-x-4 gap-y-8">
        {products.map((item, idx: number) => {
          return (
            // <Card
            //   key={`product-card-${idx}`}
            //   id={item.id}
            //   imageUrl={item.imageUrl}
            //   name={item.name}
            //   price={item.price}
            //   color={item.color}
            //   categoryId={item.categoryId}
            //   categoriesInfo={categoriesInfo}
            // />
            <Card
              key={`product-card-${idx}`}
              // colors={colors}
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              price={item.price}
              color={item.color}
              Sub_Category={item.Sub_Category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
