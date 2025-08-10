"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

interface OptionType {
  value: string;
  label: string;
}

export type FilterField<T = any> = {
  label: string;
  name: string;
  type: "text" | "select" | "date";
  options?: OptionType[]; // only for 'select'
  from_db?: boolean;
  setSearch?: (search: string) => void;
  search?: string;
  isLoading?: boolean;
  data?: T[];
  searchItems?: () => void;
};

type Props = {
  config: FilterField[];
  onFilterChange: (filters: Record<string, string>) => void;
  generateReport: () => void;
};

export default function FilterBar({
  config,
  onFilterChange,
  generateReport,
}: Props) {
  const [openField, setOpenField] = useState<string | null>(null);
  const [openInline, setOpenInline] = useState<boolean>(false);

  const form = useForm<Record<string, string>>();

  const handleSubmit = (filters: Record<string, string>) => {
    onFilterChange(filters);
  };

  return (
    <div className="w-full flex items-center justify-between bg-white px-4 py-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-wrap gap-4 items-center"
        >
          {config.map(
            ({
              label,
              name,
              type,
              options,
              from_db = false,
              setSearch,
              search,
              isLoading = false,
              data = [],
              searchItems,
            }) => (
              <div key={name} className="flex flex-col min-w-[200px]">
                {type === "select" ? (
                  from_db && setSearch && searchItems ? (
                    <div className="relative">
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem className="flex flex-col ">
                            <FormLabel className="absolute left-2 -top-2 bg-white text-sm px-1 text-gray-600">
                              {label}
                            </FormLabel>
                            <Popover
                              open={openInline}
                              onOpenChange={(newOpen) => {
                                setOpenInline(newOpen);
                                if (!newOpen) {
                                  setSearch("");
                                } else if (
                                  search &&
                                  data.length === 0 &&
                                  !isLoading
                                ) {
                                  searchItems();
                                }
                              }}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openInline}
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground",
                                    )}
                                    disabled={isLoading && openInline}
                                  >
                                    {isLoading && openInline ? (
                                      <span className="flex items-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading...
                                      </span>
                                    ) : field.value ? (
                                      data.find(
                                        (item: any) => item.id === field.value,
                                      )?.name || "Loading..."
                                    ) : (
                                      "Select a category..."
                                    )}
                                    {!isLoading && (
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0">
                                <Command>
                                  <CommandInput
                                    placeholder="Search categories..."
                                    value={search}
                                    onValueChange={setSearch}
                                  />
                                  <CommandList>
                                    {isLoading && openInline ? (
                                      <CommandEmpty className="py-6 text-center text-sm">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                                        Fetching menu category...
                                      </CommandEmpty>
                                    ) : data.length === 0 ? (
                                      <CommandEmpty className="py-6 text-center text-sm">
                                        No menu category found.
                                      </CommandEmpty>
                                    ) : (
                                      <CommandGroup>
                                        {data.map((item: any, index) => (
                                          <CommandItem
                                            key={index}
                                            value={item.name}
                                            onSelect={() => {
                                              field.onChange(item.id);
                                              setOpenInline(false);
                                              setSearch("");
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                item.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {item.name}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    )}
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                      {form.getValues(name) && (
                        <button
                          type="button"
                          onClick={() => form.setValue(name, "")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem className="flex flex-col ">
                            <FormLabel className="absolute left-2 -top-2 bg-white text-sm px-1 text-gray-600">
                              {label}
                            </FormLabel>
                            <Popover
                              open={openField === name}
                              onOpenChange={(isOpen) =>
                                setOpenField(isOpen ? name : null)
                              }
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openField === name}
                                    className="w-[200px] justify-between"
                                  >
                                    {field.value
                                      ? options?.find(
                                          (opt) => opt.value === field.value,
                                        )?.label
                                      : "Select option..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput
                                    placeholder="Search..."
                                    className="h-9"
                                  />
                                  <CommandList>
                                    <CommandEmpty>
                                      No results found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {options?.map((option, index) => (
                                        <CommandItem
                                          key={index}
                                          onSelect={() => {
                                            field.onChange(option.value);
                                            setOpenField(null);
                                          }}
                                        >
                                          {option.label}
                                          <Check
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              field.value === option.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                      {form.getValues(name) && (
                        <button
                          type="button"
                          onClick={() => form.setValue(name, "")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  )
                ) : (
                  <div className="relative">
                    <label className="absolute left-2 -top-2 bg-white text-sm px-1 text-gray-600">
                      {label}
                    </label>
                    <input
                      type={type}
                      className="border rounded px-2 py-2 pr-8 w-[200px]"
                      placeholder={label}
                      {...form.register(name)}
                    />
                    {form.getValues(name) && (
                      <button
                        type="button"
                        onClick={() => form.setValue(name, "")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )}
              </div>
            ),
          )}
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Apply
          </Button>
        </form>
      </Form>

      <Button
        variant="secondary"
        className="ml-4 hover:bg-gray-500 hover:text-gray-200"
        onClick={generateReport}
      >
        Generate Report
      </Button>
    </div>
  );
}
