import ProductList from "@/components/productList";
import ProductNav from "@/components/productNav";
import { Combobox } from "@/components/selectBox";
import { getCategoriesThunk } from "@/redux/reducer/Categories";
import { getClothesByCategoryThunk } from "@/redux/reducer/Clothes";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const Category = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { category } = router.query;

  const { clothesInfo, sortValue } = useSelector(
    (state: RootState) => state.clothes
  );
  const { categoriesInfo } = useSelector(
    (state: RootState) => state.categories
  );
  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      categoriesInfo?.forEach((item) => {
        const products = getCategoryData(category);

        if (item.name === products) {
          dispatch(
            getClothesByCategoryThunk({ categoryId: item.id, sortValue })
          );
        }
        // console.log(products, category);
      });
    }
  }, [categoriesInfo, category, dispatch, sortValue]);

  return (
    <div className="min-h-screen">
      <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
        <h1 className="uppercase font-bold text-xl md:text-3xl p-10 text-center md:text-left">
          {getCategoryData(category as string)}
        </h1>

        <div className="flex justify-between">
          <div className="space-y-3">
            <h1>Kết quả</h1>
            <p>{clothesInfo?.length} mặt hàng</p>
          </div>
          <div className="space-y-3">
            <h1>Sắp xếp theo</h1>
            <Combobox textFilters={textFilters} />
          </div>
        </div>
        {categoriesInfo && clothesInfo && (
          <div className="grid grid-cols-12 gap-x-8">
            <ProductNav
              className="md:col-span-4 col-span-full mb-4 md:mb-0"
              categoryArr={categoriesInfo}
            />
            <ProductList
              className="md:col-span-8 col-span-full"
              products={clothesInfo}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;

const textFilters = [
  {
    label: "Tiêu biểu",
  },
  {
    label: "Hàng mới về",
  },
  {
    label: "Từ thấp đến cao",
  },
  {
    label: "Từ cao đến thấp",
  },
];

export const getCategoryData = (category: string | string[]): string => {
  // Implement logic to fetch or return data based on the category
  switch (category) {
    case "tops":
      return "Áo";
    case "bottoms":
      return "Quần";
    case "outwears":
      return "Đồ mặc ngoài";
    case "dresses":
      return "Đầm";
    default:
      return "";
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Define the allowed categories
  const allowedCategories = ["tops", "bottoms", "outwears", "dresses"];

  // Generate the paths based on the allowed categories
  const paths = allowedCategories.map((category) => ({
    params: { category },
  }));

  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch data or perform any necessary logic based on the current category
  const category = params?.category || "";

  // Pass the category to the component
  return {
    props: {
      category,
    },
  };
};
