"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { ComboBoxProps } from "@/common/type";
import { getSort } from "@/redux/reducer/Clothes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/Store";

export function Combobox({ textFilters }: ComboBoxProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("0");
  const [label, setLabel] = React.useState<string>("0 ");
  React.useEffect(() => {
    addValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  React.useEffect(() => {
    textFilters.forEach((item) => {
      if (value === item.value) {
        setLabel(item.label);
      }
    });
  }, [value, label, textFilters]);

  React.useEffect(() => {
    dispatch(getSort(value));
  }, [value, dispatch]);

  const addValue = () => {
    if (textFilters) {
      textFilters.forEach((item, idx) => {
        item.value = idx.toString();
      });
    }
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
          {value
            ? textFilters.find((textFilter) => textFilter.value === value)
                ?.label
            : textFilters[0].label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {textFilters.map((textFilter) => (
              <CommandItem
                key={textFilter.value}
                value={textFilter.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === textFilter.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {textFilter.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
