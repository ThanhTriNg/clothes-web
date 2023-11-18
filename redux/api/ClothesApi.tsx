import AxiosClient, { TheColorAPI } from "./AxiosClient";

const ClothesApi = {
  getClothes: () => {
    return AxiosClient.get("/clothes", {});
  },
  getColorName: (hex: string) => {
    return TheColorAPI.get(`/id?hex=${hex}`);
  },
};

export default ClothesApi;
