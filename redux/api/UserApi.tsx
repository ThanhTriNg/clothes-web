import { UserProps } from "../module";
import AxiosClient from "./AxiosClient";

const UserApi = {
  logIn: (user: UserProps) => {
    return AxiosClient.post("/login", user);
  },
  signUp: (user: UserProps) => {
    return AxiosClient.post("signup", user);
  },
};

export default UserApi;
