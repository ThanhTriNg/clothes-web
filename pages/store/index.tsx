import ProductList from "@/components/productList";
import ProductNav from "@/components/productNav";
import { Combobox } from "@/components/selectBox";
import { getCategoriesThunk } from "@/redux/reducer/Categories";
import { getClothesThunk } from "@/redux/reducer/Clothes";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Store = () => {
  const dispatch = useDispatch<AppDispatch>();

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
    dispatch(getClothesThunk(sortValue));
  }, [sortValue, dispatch]);
  // console.log(categoriesInfo);
  return (
    <div className="min-h-screen">
      {clothesInfo && categoriesInfo && (
        <div className=" bg-white p-6 space-y-10">
          <h1 className="uppercase font-bold text-3xl p-10">Tất cả</h1>

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
          <div className="grid grid-cols-12 gap-x-8">
            <ProductNav className="col-span-4" categoryArr={categoriesInfo} />
            <ProductList
              className="col-span-8"
              products={clothesInfo}
              categoriesInfo={categoriesInfo}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;

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
