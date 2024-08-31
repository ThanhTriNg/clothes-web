'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { ComboBoxProps } from '@/common/type';
import { getSort } from '@/redux/reducer/Clothes';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store/Store';
import { useCallback, useEffect, useState } from 'react';
import { SortValueType } from '@/redux/module';

export function Combobox({ textFilters }: ComboBoxProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    // const addValue = useCallback(() => {
    //     if (textFilters) {
    //         textFilters.forEach((item, idx) => {
    //             item.value = idx.toString();
    //         });
    //     }
    // }, [textFilters]);

    // useEffect(() => {
    //     addValue();
    // }, [addValue]);

    useEffect(() => {
        if (textFilters) {
            textFilters.forEach((item, idx) => {
                item.value = idx.toString();
            });
        }
    }, [textFilters]);

    const handleSort = ({ sortBy, sortOrder }: SortValueType) => {
        dispatch(getSort({ sortOrder, sortBy }));
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between border-solid border-[1px] border-black/30"
                >
                    {value ? textFilters.find((textFilter) => textFilter.value === value)?.label : textFilters[0].label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandGroup>
                        {textFilters.map((textFilter, idx: number) => {
                            return (
                                <CommandItem
                                    key={`comboBox-${idx}`}
                                    value={textFilter.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? '0' : currentValue);
                                        setOpen(false);
                                        handleSort({ sortBy: textFilter.sortBy, sortOrder: textFilter.sortOrder });
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === textFilter.value ? 'opacity-100' : 'opacity-0',
                                        )}
                                    />
                                    {textFilter.label}
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
