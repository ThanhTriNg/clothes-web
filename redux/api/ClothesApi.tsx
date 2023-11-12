import AxiosClient from "./AxiosClient";

const ClothesApi = {
  getClothes: () => {
    return AxiosClient.get("/clothes", {});
  },
};

export default ClothesApi;
