import { AddClothesProps } from "../module";
import AxiosClient, { TheColorAPI } from "./AxiosClient";
const ClothesApi = {
  getClothes: () => {
    return AxiosClient.get("/clothes");
  },
  getLatestClothes: () => {
    return AxiosClient.get(`/clothes/?_sort=createdAt&_order=desc`);
  },
  getClothesById: (id: string) => {
    return AxiosClient.get(`/clothes/${id}`);
  },
  getClothesByName: (name: string) => {
    return AxiosClient.get(`/clothes/?name_like=${name}`);
  },

  getClothesByPriceAscending: () => {
    return AxiosClient.get(`/clothes/?_sort=price`);
  },
  getClothesByPriceDescending: () => {
    return AxiosClient.get(`/clothes/?_sort=price&_order=desc`);
  },
  getClothesByCategory: (categoryId: string) => {
    return AxiosClient.get(`/clothes/?categoryId=${categoryId}`);
  },
  getLatestClothesByCategory: (categoryId: string) => {
    return AxiosClient.get(`/clothes/?categoryId=${categoryId}&_sort=createAt&_order=desc`);
  },
  getClothesPriceAscendingByCategory: (categoryId: string) => {
    return AxiosClient.get(`/clothes/?categoryId=${categoryId}&_sort=price`);
  },
  getClothesPriceDescendingByCategory: (categoryId: string) => {
    return AxiosClient.get(
      `/clothes/?categoryId=${categoryId}&_sort=price&_order=desc`
    );
  },
  getColorName: (hex: string) => {
    return TheColorAPI.get(`/id?hex=${hex}`);
  },
  addClothes: (addClothes: AddClothesProps) => {
    return AxiosClient.post("/clothes", addClothes);
  },
  getCategories: () => {
    return AxiosClient.get("/categories");
  },
};

export default ClothesApi;
