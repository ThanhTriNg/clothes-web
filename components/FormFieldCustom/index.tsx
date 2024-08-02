import { FormFieldInputProps, FormFieldProps, FormFieldRadioProps } from '@/components/FormFieldCustom/module';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { formatPrice } from '@/utils';
import { FieldValues, PathValue, Path } from 'react-hook-form';

export const FormFieldInput = <TProps extends FieldValues>({
    form,
    name,
    type = 'text',
}: FormFieldInputProps<TProps>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel className="text-black font-semibold text-sm uppercase">{name}</FormLabel>
                        <FormControl>
                            <Input
                                type={type}
                                // variant="default"
                                placeholder={name}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export const FormFieldFile = <TProps extends FieldValues>({
    form,
    name,
    type = 'text',
}: FormFieldInputProps<TProps>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-black font-semibold text-sm uppercase">{name}</FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            // variant="default"
                            placeholder={name}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
export const FormFieldArena = <TProps extends FieldValues>({ form, name, placeholder }: FormFieldProps<TProps>) => {
    let ph: string = '';
    if (name) {
        ph = name;
    }
    if (placeholder) {
        ph = placeholder;
    }
    const spacedString = name.replace(/([A-Z])/g, ' $1');
    const readableString = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-black font-semibold text-sm uppercase">{readableString}</FormLabel>
                    <FormControl>
                        <Textarea className="h-[400px]" placeholder={ph} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
export const FormFieldRadio = <TProps extends FieldValues>({ form, name, options }: FormFieldRadioProps<TProps>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel className="text-black font-semibold text-sm uppercase">{name}</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                            >
                                {options.map((item: any, idx: number) => {
                                    return (
                                        <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={item} />
                                            </FormControl>
                                            <FormLabel className="font-normal uppercase">{item}</FormLabel>
                                        </FormItem>
                                    );
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};
