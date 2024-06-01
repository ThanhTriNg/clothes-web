import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { loginThunk } from "@/redux/reducer/User";
import { AppDispatch, RootState } from "@/redux/store/Store";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/loading";
const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Bắt buộc" })
    .min(0)
    .email("Vui vòng nhập địa chỉ email hợp lệ"),
  password: z.string().min(8, "Tối thiểu 8 kí tự"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });
  const { errorLogin, successLogin, loading, message } = useSelector(
    (state: RootState) => state.users
  );
  const key = "jlasdfuy6mnqweo@#$_)d41414141sf123456";
  const dispatch = useDispatch<AppDispatch>();

  //check remember me flag
  useEffect(() => {
    const rememberMeFlag = localStorage.getItem("rememberMe");
    if (rememberMeFlag === "true") {
      const savedEmail = localStorage.getItem("email");
      const encryptedPassword = localStorage.getItem("password");
      setIsChecked(true);
      if (encryptedPassword) {
        const decryptedPassword = CryptoJS.AES.decrypt(
          encryptedPassword,
          key
        ).toString(CryptoJS.enc.Utf8);

        if (savedEmail && decryptedPassword) {
          form.setValue("email", savedEmail);
          form.setValue("password", decryptedPassword);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (successLogin) {
      const email = form.getValues().email;
      const password = form.getValues().password;
      handleRememberMeChange(email, password, isChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, successLogin]);

  //errorLogin
  useEffect(() => {
    if (errorLogin) {
      toast.error(`${message}. Please try again`);
    } else if (successLogin) {
      if (localStorage.getItem("isFirstLogin") !== "true") {
        localStorage.setItem("isFirstLogin", "true");
        toast.success(message);
      }
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorLogin, successLogin, dispatch]);

  const handleRememberMeChange = (
    email: string,
    password: string,
    isChecked: boolean
  ) => {
    if (isChecked) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", email);
      const encryptedPassword = CryptoJS.AES.encrypt(password, key).toString();
      localStorage.setItem("password", encryptedPassword);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  // handle submit form => call api login
  async function onSubmit(data: LoginFormValues) {
    // console.log(data);
    try {
      const email = data.email;
      const password = data.password;
      dispatch(loginThunk({ email, password }));
    } catch (error) {}
  }
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const SelectedIconPassword = passwordShown ? EyeIcon : EyeOffIcon;

  return loading ? (
    <div className="flex justify-center items-center h-full">
      <Loading />
    </div>
  ) : (
    <>
      <Card id="card" className="grid gap-6 bg-transparent border-none">
        <CardHeader className="text-center grid gap-2 p-0">
          <CardTitle className="text-2xl font-bold text-tertiary-foreground ">
            Đăng nhập
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-semibold text-sm">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        // variant="default"
                        placeholder="Nhập mail của bạn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-semibold text-sm">
                      Mật khẩu
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          // variant="default"
                          type={passwordShown ? "text" : "password"}
                          autoComplete="on"
                          placeholder="Nhâp mật khẩu"
                          {...field}
                        />
                      </FormControl>
                      <SelectedIconPassword
                        className="absolute top-[50%] right-2.5 -translate-y-1/2  cursor-pointer"
                        width={20}
                        height={20}
                        onClick={togglePassword}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between !mt-3 text-sm">
                <div className="flex gap-2 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="w-[18px] h-[18px] cursor-pointer rounded-[4px]"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-black  select-none cursor-pointer"
                  >
                    Nhớ tôi
                  </label>
                </div>
                <Link
                  href="#"
                  className="text-[#0084B8]  flex items-center underline "
                >
                  Quên mật khẩu
                </Link>
              </div>
              <Button
                type="submit"
                className="btn-aware w-full text-white uppercase font-bold rounded-[6px] "
              >
                Đăng nhập
                <span className={`bg-[#00668F]   !duration-[800ms]`}></span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
