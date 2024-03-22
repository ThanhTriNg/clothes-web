import { GetSubCateProps } from "../module";
import AxiosClient from "./AxiosClient";
const CategoriesApi = {
  getCategories: () => {
    return AxiosClient.get("/categories");
  },
  getMenSubCate: () => {
    return AxiosClient.get(`/men`);
  },
  getWomenSubCate: () => {
    return AxiosClient.get(`/women`);
  },

  getSubCateByCategoryId: (getSubCate: GetSubCateProps) => {
    const { subName, categoryId } = getSubCate;
    return AxiosClient.get(`/${subName}/?categoryId=${categoryId}`);
  },
};

export default CategoriesApi;
