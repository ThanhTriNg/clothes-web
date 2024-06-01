import { AddClothesProps } from "../module";
import AxiosClient, { TheColorAPI, AxiosClient2 } from "./AxiosClient";
const ClothesApi = {
  getClothes: () => {
    return AxiosClient.get("/clothes");
  },
  getNewClothes: () => {
    return AxiosClient.get("/api/v1/clothes");
  },
  getLatestClothes: () => {
    return AxiosClient.get(`/clothes/?sort=createdAt&order=DESC`);
  },
  getClothesById: (id: string) => {
    return AxiosClient.get(`/clothes/${id}`);
  },
  getClothesByName: (name: string) => {
    return AxiosClient.get(`/clothes/?name=${name}`);
  },

  getClothesByPriceAscending: () => {
    return AxiosClient.get(`/clothes/?sort=price`);
  },
  getClothesByPriceDescending: () => {
    return AxiosClient.get(`/clothes/?sort=price&order=DESC`);
  },
  //cate
  getClothesByCategory: (categoryId: string) => {
    return AxiosClient.get(`/clothes/?categoryId=${categoryId}`);
  },
  getLatestClothesByCategory: (categoryId: string) => {
    return AxiosClient.get(
      `/clothes/?categoryId=${categoryId}&sort=createdAt&order=DESC`
    );
  },
  getClothesPriceAscendingByCategory: (categoryId: string) => {
    return AxiosClient.get(`/clothes/?categoryId=${categoryId}&sort=price`);
  },
  getClothesPriceDescendingByCategory: (categoryId: string) => {
    return AxiosClient.get(
      `/clothes/?categoryId=${categoryId}&sort=price&order=DESC`
    );
  },

  //sub Cate
  getClothesBySubCategory: (subCategoryId: number[]) => {
    return AxiosClient.get(`/clothes/?subCategoryId=${subCategoryId}`);
  },
  getLatestClothesBySubCategory: (subCategoryId: number[]) => {
    return AxiosClient.get(
      `/clothes/?subCategoryId=${subCategoryId}&sort=createdAt&order=DESC`
    );
  },
  getClothesPriceAscendingBySubCategory: (subCategoryId: number[]) => {
    return AxiosClient.get(
      `/clothes/?subCategoryId=${subCategoryId}&sort=price`
    );
  },
  getClothesPriceDescendingBySubCategory: (subCategoryId: number[]) => {
    return AxiosClient.get(
      `/clothes/?subCategoryId=${subCategoryId}&sort=price&order=DESC`
    );
  },

  getColorName: (hex: string) => {
    return TheColorAPI.get(`/id?hex=${hex}`);
  },
  addClothes: (formData: any) => {
    return AxiosClient2.post("/clothes", formData);
  },
  getCategories: () => {
    return AxiosClient.get("/categories");
  },
};

export default ClothesApi;
