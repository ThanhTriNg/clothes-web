import { HTMLInputTypeAttribute } from 'react';
import { UseFormReturn, Path, FieldValues } from 'react-hook-form';
export interface FormFieldProps<TProps extends FieldValues> {
    form: UseFormReturn<TProps>;
    name: Path<TProps>;
    placeholder?: string;
}
export interface FormFieldInputProps<TProps extends FieldValues> extends FormFieldProps<TProps> {
    type?: HTMLInputTypeAttribute;
}
export interface FormFieldRadioProps<TProps extends FieldValues> extends FormFieldProps<TProps> {
    options: string[];
}
