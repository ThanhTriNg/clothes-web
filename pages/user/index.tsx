import { AppDispatch, RootState } from "@/redux/store/Store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "@/redux/reducer/User";
import UserForm from "@/pages/user/UserForm";
const User = () => {
  const { userInfo } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  return (
    userInfo && (
      <div>
        <h1 className="text-center font-bold text-2xl">Account Settings</h1>
        <div className="space-y-8 mt-4">
          <div className="space-y-2 ">
            <p className="font-bold">Account Information</p>
            <p>
              <strong>ID</strong>:{userInfo.id}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-bold">Personal Details</p>
            <div>
              <UserForm userInfo={userInfo} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default User;
