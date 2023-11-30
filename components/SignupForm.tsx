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
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AppDispatch } from "@/redux/store/Store";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const signUpFormSchema = z
  .object({
    email: z.string({ required_error: "" }).min(1, " "),
    password: z.string({ required_error: "" }).min(1, " "),
    confirmPassword: z.string({ required_error: " " }).min(1, " "),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: " ",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch<AppDispatch>();

  const [passwordShown, setPasswordShown] = useState(false);
  const SelectedIconPassword = passwordShown ? EyeIcon : EyeOffIcon;

  async function onSubmit(data: SignUpFormValues) {
    // console.log(data);
    try {
      const username = data.email;
      const password = data.password;
    } catch (error) {}
  }
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <Card id="card" className="grid gap-6 bg-transparent border-none ">
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
                        placeholder="Enter your email"
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
                          placeholder="Re-enter your password"
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
                          type={passwordShown ? "text" : "password"}
                          autoComplete="on"
                          placeholder="Re-enter your password"
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
