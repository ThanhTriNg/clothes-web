import ProductList from "@/components/productList";
import ProductNav from "@/components/productNav";
import { Combobox } from "@/components/selectBox";
import StoreUI from "@/components/storeUI";
import { getCategoriesThunk } from "@/redux/reducer/Categories";
import { getClothesThunk, getNewClothesThunk } from "@/redux/reducer/Clothes";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Store = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { clothesInfoData, sortValue } = useSelector(
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
  return (
    clothesInfoData &&
    categoriesInfo && (
      <StoreUI
        categoriesInfo={categoriesInfo}
        clothesInfoData={clothesInfoData}
        title="All"
      />
    )
  );
};

export default Store;

export const textFilters = [
  {
    label: "Featured",
  },
  {
    label: "New arrivals",
  },
  {
    label: "Low to high",
  },
  {
    label: "High to low",
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
