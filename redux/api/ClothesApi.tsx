import AxiosClient, { TheColorAPI } from "./AxiosClient";
import { AddClothesProps } from "../module";
const ClothesApi = {
  getClothes: () => {
    return AxiosClient.get("/clothes");
  },
  getClothesById: (id: string) => {
    return AxiosClient.get(`/clothes/${id}`);
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
