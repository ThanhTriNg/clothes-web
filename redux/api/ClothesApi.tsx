import { AddClothesProps } from "../module";
import AxiosClient, { TheColorAPI } from "./AxiosClient";
const ClothesApi = {
  getClothes: () => {
    return AxiosClient.get("/clothes");
  },
  getClothesById: (id: string) => {
    return AxiosClient.get(`/clothes/${id}`);
  },
  getClothesByName: (name: string) => {
    return AxiosClient.get(`/clothes/?name_like=${name}`);
  },
  getClothesByCategory: (categoryId: string) => {
    return AxiosClient.get(`/clothes/?categoryId=${categoryId}`);
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
