import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { HTMLInputTypeAttribute, useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";

import { signUpThunk } from "@/redux/reducer/User";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createCateThunk } from "@/redux/reducer/Categories";
import { FormFieldInput, FormFieldRadio } from "@/components/FormFieldCustom";
const addCateFormSchema = z.object({
  name: z.string().min(1),
  gender: z.enum(["female", "male", "both"], {
    required_error: "You need to select a notification type.",
  }),
});

type AddCateFormValues = z.infer<typeof addCateFormSchema>;

const CreateCategory = () => {
  const form = useForm<AddCateFormValues>({
    resolver: zodResolver(addCateFormSchema),
    mode: "onSubmit",
  });
  const dispatch = useDispatch<AppDispatch>();

  async function onSubmit(data: AddCateFormValues) {
    console.log(data);
    try {
      const name = data.name;
      const gender = data.gender;
      await  dispatch(createCateThunk({ name, gender }));
    } catch (error) {}
  }

  return (
    <div className=" mx-auto xl:max-w-[1300px]">
      <div className="bg-white md:p-6 md:space-y-10 p-2 space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full space-y-4"
          >
            <FormFieldInput form={form} name="name" />

            <FormFieldRadio
              form={form}
              name="gender"
              options={["female", "male", "both"]}
            />
            <Button
              type="submit"
              className="btn-aware w-full text-white uppercase font-bold rounded-[6px] "
            >
              Create
              <span className={`bg-[#00668F]   !duration-[800ms]`}></span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCategory;
