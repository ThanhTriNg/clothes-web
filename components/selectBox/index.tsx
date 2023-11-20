"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { TextFilter, ComboBoxProps } from "@/common/type";

export function Combobox({ textFilters }: ComboBoxProps) {
  const addValue = () => {
    if (textFilters) {
      textFilters.forEach((item, idx) => {
        item.value = idx.toString();
      });
    }
  };
  React.useEffect(() => {
    addValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("0");
  const [label, setLabel] = React.useState<string>("0 ");

  React.useEffect(() => {
    textFilters.forEach((item) => {
      if (value === item.value) {
        setLabel(item.label);
      }
    });
  }, [value, label, textFilters]);

  React.useEffect(() => {
    // console.log(label);
  }, [label]);

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
