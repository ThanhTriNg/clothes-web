import AxiosClient from "./AxiosClient";
const GenderApi = {
  getGender: () => {
    return AxiosClient.get("/gender");
  },
};

export default GenderApi;
