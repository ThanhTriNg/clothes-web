import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { signUpThunk } from "@/redux/reducer/User";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const signUpFormSchema = z
  .object({
    email: z
      .string({ required_error: "Bắt buộc" })
      .min(1, " ")
      .email("Vui vòng nhập địa chỉ email hợp lệ"),
    password: z
      .string({ required_error: "Bắt buộc" })
      .min(8, "Tối thiểu 8 kí tự"),
    confirmPassword: z.string({ required_error: "" }).min(8, " "),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không trùng khớp",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export default function SignUpForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [rePasswordShown, setRePasswordShown] = useState(false);
  const { errorSignup, errorSignupText, successSignup } = useSelector(
    (state: RootState) => state.users
  );
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onSubmit",
  });
  const dispatch = useDispatch<AppDispatch>();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleRePassword = () => {
    setRePasswordShown(!rePasswordShown);
  };

  //if error sign up
  useEffect(() => {
    if (errorSignup) {
      if (errorSignupText === "Email already exists") {
        toast.error("Email này đã tồn tại");
      } else toast.error(errorSignupText);
    }
  }, [errorSignup, dispatch, errorSignupText]);

  // if success sign up
  useEffect(() => {
    if (successSignup) {
      toast.success("Đăng kí thành công");
      form.setValue("email", "");
      form.setValue("password", "");
      form.setValue("confirmPassword", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successSignup]);
  const IconPassword = passwordShown ? EyeIcon : EyeOffIcon;
  const IconRePassword = rePasswordShown ? EyeIcon : EyeOffIcon;

  async function onSubmit(data: SignUpFormValues) {
    // console.log(data);
    try {
      const email = data.email;
      const password = data.password;
      await dispatch(signUpThunk({ email, password }));
    } catch (error) {}
  }
  return (
    <>
      <Card id="card-signup" className="grid gap-6 bg-transparent border-none ">
        <CardHeader className="text-center grid gap-2 p-0">
          <CardTitle className="text-2xl font-bold text-tertiary-foreground ">
            Đăng ký
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full space-y-4"
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
                        placeholder="Nhập email của bạn"
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
                          placeholder="Nhập mật khẩu"
                          {...field}
                        />
                      </FormControl>
                      <IconPassword
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-semibold text-sm">
                      Nhập lại mật khẩu
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          // variant="default"
                          type={rePasswordShown ? "text" : "password"}
                          autoComplete="on"
                          placeholder="Nhập lại mật khẩu"
                          {...field}
                        />
                      </FormControl>
                      <IconRePassword
                        className="absolute top-[50%] right-2.5 -translate-y-1/2 cursor-pointer"
                        width={20}
                        height={20}
                        onClick={toggleRePassword}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="btn-aware w-full text-white uppercase font-bold rounded-[6px] "
              >
                Đăng ký
                <span className={`bg-[#00668F]   !duration-[800ms]`}></span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
