import { CateApiProps, GetSubCateProps } from "../module";
import AxiosClient from "./AxiosClient";

const CategoriesApi = {
  getCategories: () => {
    return AxiosClient.get("/categories");
  },

  getSubCateByCateId: (categoryId: number) => {
    return AxiosClient.get(`/subCategories?categoryId=${categoryId}`);
  },

  //create cate
  createCate: (category: CateApiProps) => {
    return AxiosClient.post("/categories", category);
  },

  // sub cate
  getAllSubCate: () => {
    return AxiosClient.get("/subCategories");
  },
};

export default CategoriesApi;
