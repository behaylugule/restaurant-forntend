"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MenuType } from "@/type/menu.model";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { menuService } from "@/lib/services/menuService";
import { useEffect, useMemo, useState } from "react";

import { shopService } from "@/lib/services/shopsService";

import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

import { usePagination } from "@/hook/usePagination";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { categoryService } from "@/lib/services/categoryService";
import { CategoryModel } from "@/type/category.model";

import { USER_ROLE_OPTIONS } from "@/utils/constant";
import { fileService } from "@/lib/services/fileService";

interface PropsType {
  setOpen: (open: boolean) => void;
  getMenus: () => void;
  actionType: string;
  menuDetail?: MenuType;
}

export default function AddMenu({
  setOpen,
  getMenus,
  actionType = "add",
  menuDetail,
}: PropsType) {
  const form = useForm<MenuType>({ defaultValues: { ...menuDetail } });
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const paginationCat = usePagination();
  const [openCat, setCatOpenInline] = useState<boolean>(false);
  const [fileId, setFileId] = useState<string>();

  useEffect(() => {
    searchCategories();
  }, []);

  const onSubmit = (data: MenuType) => {
    // data.published_date = format(data.published_date)
    if (fileId) {
      data.image = fileId;
    }
    if (actionType === "add") {
      setIsLoading(true);
      menuService
        .addMenu(data)
        .then(() => {
          toast.success("Menu has been created sucessfuly");
          setIsLoading(false);
          setOpen(false);
          getMenus();
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    } else if (actionType === "edit") {
      menuService
        .updateMenu(data)
        .then(() => {
          toast.success("Menu has been updated sucessfuly");
          setIsLoading(false);
          setOpen(false);
          getMenus();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const selectedMenuCategoryName = useMemo(() => {
    const organizationFound = categories.find(
      (category) => category.id === form.getValues("menu_category"),
    )?.name;
    if (organizationFound) {
      return organizationFound;
    }
    if (categories.length > 0 && form.getValues("menu_category")) {
      categoryService
        .getCategory(form.getValues("menu_category") || "")
        .then((res) => {
          setCategories((prev) => [...prev, res.data.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [categories, form.getValues("menu_category")]);

  const searchCategories = () => {
    setIsLoading(true);
    categoryService
      .getCategories({
        page: paginationCat.page,
        page_size: paginationCat.pageSize,
        search: paginationCat.search,
      })
      .then((res) => {
        setCategories(res.data.data.results);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (!e.target.files[0]) return;

      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("title", e.target.files[0].name);
      fileService
        .uploadFile(formData)
        .then((res) => {
          setFileId(res.data.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormItem className="">
            <FormLabel>Menu Name</FormLabel>
            <FormControl>
              <Input
                placeholder="name"
                {...form.register("name", {
                  required: "name is required field",
                })}
              />
            </FormControl>
            {form.formState.errors.name && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.name.message}
              </FormDescription>
            )}
          </FormItem>

          <FormItem className="mt-6">
            <FormLabel>description</FormLabel>
            <FormControl>
              <Input
                placeholder="description"
                {...form.register("description", {
                  required: "description is required field",
                })}
              />
            </FormControl>
            {form.formState.errors.description && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.description.message}
              </FormDescription>
            )}
          </FormItem>

          <FormItem className="mt-6">
            <FormLabel> Price</FormLabel>
            <FormControl>
              <Input
                placeholder="price"
                {...form.register("price")}
                type="number"
              />
            </FormControl>
          </FormItem>
          <FormItem className="mt-6">
            <FormLabel>Preparation Time(minutes)</FormLabel>
            <FormControl>
              <Input
                placeholder="preparation time in minutes"
                {...form.register("preparation_time", {
                  required: "preparation time is required field",
                })}
              />
            </FormControl>
          </FormItem>

          <FormField
            control={form.control}
            name="menu_category"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-6">
                <FormLabel>Menu Category</FormLabel>
                <Popover
                  open={openCat}
                  onOpenChange={(newOpen) => {
                    setCatOpenInline(newOpen);
                    if (!newOpen) {
                      paginationCat.setSearch(""); // Clear search term when closing
                    } else {
                      if (
                        !paginationCat.search &&
                        categories.length === 0 &&
                        !isLoading
                      ) {
                        searchCategories();
                      }
                    }
                  }}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCat}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground ",
                        )}
                        // Disabled state now depends only on whether the API call is in progress
                        disabled={isLoading && openCat} // Disable the button itself if actively loading and popover is open
                      >
                        {isLoading && openCat ? ( // Show loader in button ONLY if popover is open and loading
                          <span className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            Loading...
                          </span>
                        ) : field.value ? (
                          selectedMenuCategoryName || "Loading selected..." // Display name of selected, or "Loading" if not yet found
                        ) : (
                          "Select a menu category..."
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
                        value={paginationCat.search} // Controlled input
                        onValueChange={paginationCat.setSearch} // Update search term state on change
                      />
                      <CommandList>
                        {isLoading && openCat ? ( // Show loading indicator specifically when popover is open and fetching
                          <CommandEmpty className="py-6 text-center text-sm">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />{" "}
                            Fetching menu category...
                          </CommandEmpty>
                        ) : categories.length === 0 ? (
                          <CommandEmpty className="py-6 text-center text-sm">
                            No menu category found.
                          </CommandEmpty>
                        ) : (
                          <CommandGroup>
                            {categories.map((cat) => (
                              <CommandItem
                                value={cat.name} // Search by name
                                key={cat.id} // Use category.id as unique key
                                onSelect={() => {
                                  form.setValue("menu_category", cat.id || "");
                                  setCatOpenInline(false);
                                  paginationCat.setSearch(""); // Clear search term after selection
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    cat?.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {cat.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select an Category for your item.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormItem className="mt-4 mb-4">
            <FormLabel>Menu Image</FormLabel>
            <FormControl>
              <Input
                placeholder="Menu Image"
                type="file"
                onChange={handleChange}
              />
            </FormControl>
          </FormItem>

          <Button type="submit" className="mt-4 hover:bg-gray-600">
            {isLoading ? (
              <span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
            ) : actionType == "edit" ? (
              "Update Menu"
            ) : (
              "Add Menu"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
