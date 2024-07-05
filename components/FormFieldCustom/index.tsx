import { FormFieldInputProps, FormFieldProps, FormFieldRadioProps } from '@/components/FormFieldCustom/module';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

export const FormFieldInput = ({ form, name, type = 'text' }: FormFieldInputProps) => {
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
                                // value={field.value || ''}
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

export const FormFieldFile = ({ form, name, type = 'text' }: FormFieldInputProps) => {
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
export const FormFieldArena = ({ form, name, placeholder }: FormFieldProps) => {
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
                        <Textarea placeholder={ph} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
export const FormFieldRadio = ({ form, name, options }: FormFieldRadioProps) => {
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
