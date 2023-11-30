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

  const { clothesByCategoryId } = useSelector(
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
          dispatch(getClothesByCategoryThunk(item.id));
        }
      });
    }
  }, [categoriesInfo, category, dispatch]);
  return (
    <div className="min-h-screen">
      <div className=" bg-white p-6 space-y-10">
        <h1 className="uppercase font-bold text-3xl p-10">Tất cả</h1>

        <div className="flex justify-between">
          <div className="space-y-3">
            <h1>Kết quả</h1>
            <p>{clothesByCategoryId?.length} mặt hàng</p>
          </div>
          <div className="space-y-3">
            <h1>Sắp xếp theo</h1>
            <Combobox textFilters={textFilters} />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-8">
          {categoriesInfo && (
            <ProductNav className="col-span-4" category={categoriesInfo} />
          )}
          {clothesByCategoryId && (
            <ProductList
              className="col-span-8"
              products={clothesByCategoryId}
            />
          )}
        </div>
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

const getCategoryData = (category: string | string[]): string => {
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
