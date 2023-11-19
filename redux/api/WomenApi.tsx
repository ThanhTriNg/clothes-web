import AxiosClient from "./AxiosClient";
const WomenApi = {
  getWomenClothes: (categoryId: string) => {
    return AxiosClient.get(`/women/?categoryId=${categoryId}`);
  },
};

export default WomenApi;
