import { UserAuthProps, UserProps } from "../module";
import AxiosClient from "./AxiosClient";
import Cookies from "js-cookie";

const UserApi = {
  logIn: (user: UserAuthProps) => {
    return AxiosClient.post("/auth/login", user);
  },
  signUp: (user: UserAuthProps) => {
    return AxiosClient.post("/auth/register", user);
  },
  getUser: () => {
    const token = Cookies.get("token");
    return AxiosClient.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateUser: (user: UserProps) => {
    const token = Cookies.get("token");
    return AxiosClient.patch("/users", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default UserApi;
