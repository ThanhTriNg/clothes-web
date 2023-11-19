import AxiosClient from "./AxiosClient";
import { GetSubCateProps } from "../module";
const CategoriesApi = {
  getCategories: () => {
    return AxiosClient.get("/categories");
  },
  getSubCate: (getSubCate: GetSubCateProps) => {
    const { subName, categoryId } = getSubCate;
    return AxiosClient.get(`/${subName}/?categoryId=${categoryId}`);
  },
};

export default CategoriesApi;
