import AxiosClient, { TheColorAPI } from "./AxiosClient";
import { addClothesProps } from "../module";
const ClothesApi = {
  getClothes: () => {
    return AxiosClient.get("/clothes");
  },
  getColorName: (hex: string) => {
    return TheColorAPI.get(`/id?hex=${hex}`);
  },
  addClothes: (addClothes: addClothesProps) => {
    const { categoryId, genderId, name, price, desc_sort, desc } = addClothes;
    // return AxiosClient.post("/clothes", {
    //   categoryId,
    //   genderId,
    //   name,
    //   price,
    //   desc_sort,
    //   desc,
    // });
    return AxiosClient.post("/clothes", addClothes);
  },
};

export default ClothesApi;
