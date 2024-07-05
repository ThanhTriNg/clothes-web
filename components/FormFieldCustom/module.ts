import { HTMLInputTypeAttribute } from "react";

export interface FormFieldProps {
  form: any;
  name: string;
  placeholder?: string;
}
export interface FormFieldInputProps extends FormFieldProps {
  type?: HTMLInputTypeAttribute;
}
export interface FormFieldRadioProps extends FormFieldProps {
  options: string[];
}
