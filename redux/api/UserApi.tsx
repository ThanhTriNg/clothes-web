import { UserProps } from "../module";
import AxiosClient from "./AxiosClient";

const UserApi = {
  logIn: (user: UserProps) => {
    return AxiosClient.post("/auth/login", user);
  },
  signUp: (user: UserProps) => {
    return AxiosClient.post("/auth/register", user);
  },
};

export default UserApi;
