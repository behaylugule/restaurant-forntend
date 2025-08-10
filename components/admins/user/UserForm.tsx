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
import { User } from "@/type/user";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { userService } from "@/lib/services/userService";
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
import { organizationsService } from "@/lib/services/organizationService";
import { CategoryModel } from "@/type/category.model";
import { ShopType } from "@/type/shops.model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { USER_ROLE_OPTIONS } from "@/utils/constant";
import { useAuth } from "@/components/AuthContext";
import { USER_ROLE } from "@/utils/utils";

interface PropsType {
  setOpen: (open: boolean) => void;
  getUsers: () => void;
  actionType: string;
  userDetail?: User;
}

export default function AddUser({
  setOpen,
  getUsers,
  actionType = "add",
  userDetail,
}: PropsType) {
  const form = useForm<User>({ defaultValues: { ...userDetail } });
  const [organizations, setorganizations] = useState<CategoryModel[]>([]);
  const [shops, setShops] = useState<ShopType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const paginationOrg = usePagination();
  const paginationShop = usePagination();
  const [openShop, setShopOpenInline] = useState<boolean>(false);
  const [openOrg, setOrgOpenInline] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    searchOrganizations();
    searchShops();
  }, []);

  const onSubmit = (data: User) => {
    // data.published_date = format(data.published_date)
    if (actionType === "add") {
      setIsLoading(true);
      userService
        .registerUser(data)
        .then(() => {
          toast.success("User has been created sucessfuly");
          setIsLoading(false);
          setOpen(false);
          getUsers();
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    } else if (actionType === "edit") {
      delete data.password;
      userService
        .updateProfile(data)
        .then(() => {
          toast.success("User has been updated sucessfuly");
          setIsLoading(false);
          setOpen(false);
          getUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const selectedShopName = useMemo(() => {
    const shopFound = shops.find(
      (shop) => shop.id === form.getValues("shop"),
    )?.name;
    if (shopFound) {
      return shopFound;
    }
    if (organizations.length > 0 && form.getValues("shop")) {
      shopService
        .getShop(form.getValues("shop") || "")
        .then((res) => {
          setorganizations((prev) => [...prev, res.data.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [organizations, form.getValues("shop")]);

  const searchShops = () => {
    setIsLoading(true);
    shopService
      .getShops({
        page: paginationShop.page,
        page_size: paginationShop.pageSize,
        search: paginationShop.search,
      })
      .then((res) => {
        setShops(res.data.data.results);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const selectedOrganizationName = useMemo(() => {
    const organizationFound = organizations.find(
      (category) => category.id === form.getValues("organization"),
    )?.name;
    if (organizationFound) {
      return organizationFound;
    }
    if (organizations.length > 0 && form.getValues("organization")) {
      organizationsService
        .getOrganization(form.getValues("organization") || "")
        .then((res) => {
          setorganizations((prev) => [...prev, res.data.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [organizations, form.getValues("organization")]);

  const searchOrganizations = () => {
    setIsLoading(true);
    organizationsService
      .getOrganizations({
        page: paginationOrg.page,
        page_size: paginationOrg.pageSize,
        search: paginationOrg.search,
      })
      .then((res) => {
        setorganizations(res.data.data.results);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormItem className="">
            <FormLabel>User Name</FormLabel>
            <FormControl>
              <Input
                placeholder="username"
                {...form.register("username", {
                  required: "username is required field",
                })}
              />
            </FormControl>
            {form.formState.errors.username && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.username.message}
              </FormDescription>
            )}
          </FormItem>

          <FormItem className="mt-6">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="email"
                {...form.register("email", {
                  required: "email is required field",
                })}
              />
            </FormControl>
            {form.formState.errors.username && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.username.message}
              </FormDescription>
            )}
          </FormItem>

          <FormItem className="mt-6">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                placeholder="password"
                type="password"
                {...form.register("password")}
              />
            </FormControl>
          </FormItem>

          <FormItem className="mt-6">
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input
                placeholder="first_name"
                {...form.register("first_name", {
                  required: "first_name is required field",
                })}
              />
            </FormControl>
            {form.formState.errors.first_name && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.first_name?.message}
              </FormDescription>
            )}
          </FormItem>

          <FormItem className="mt-6">
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Last Name"
                {...form.register("last_name", {
                  required: "Last name is required field",
                })}
              />
            </FormControl>
            {form.formState.errors.last_name && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.last_name?.message}
              </FormDescription>
            )}
          </FormItem>

          <FormItem className="mt-4 mb-4">
            <FormLabel>Contact Number</FormLabel>
            <FormControl>
              <Input
                placeholder="contact_number"
                {...form.register("contact_number", {
                  required: "quantity is required field",
                })}
              />
            </FormControl>
            {form.formState.errors.contact_number && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.contact_number?.message}
              </FormDescription>
            )}
          </FormItem>
          {user.role === USER_ROLE.ADMIN && (
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Organization</FormLabel>
                  <Popover
                    open={openOrg}
                    onOpenChange={(newOpen) => {
                      setOrgOpenInline(newOpen);
                      if (!newOpen) {
                        paginationOrg.setSearch(""); // Clear search term when closing
                      } else {
                        // When opening, if there's no current search term,
                        // trigger an immediate fetch for initial organizations.
                        // This is a common pattern for "on-demand" loading.
                        if (
                          !paginationOrg.search &&
                          organizations.length === 0 &&
                          !isLoading
                        ) {
                          searchOrganizations();
                        }
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openOrg}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                          // Disabled state now depends only on whether the API call is in progress
                          disabled={isLoading && openOrg} // Disable the button itself if actively loading and popover is open
                        >
                          {isLoading && openOrg ? ( // Show loader in button ONLY if popover is open and loading
                            <span className="flex items-center">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                              Loading...
                            </span>
                          ) : field.value ? (
                            selectedOrganizationName || "Loading selected..." // Display name of selected, or "Loading" if not yet found
                          ) : (
                            "Select a Organization..."
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
                          placeholder="Search organizations..."
                          value={paginationOrg.search} // Controlled input
                          onValueChange={paginationOrg.setSearch} // Update search term state on change
                        />
                        <CommandList>
                          {isLoading && openOrg ? ( // Show loading indicator specifically when popover is open and fetching
                            <CommandEmpty className="py-6 text-center text-sm">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />{" "}
                              Fetching organization...
                            </CommandEmpty>
                          ) : organizations.length === 0 ? (
                            <CommandEmpty className="py-6 text-center text-sm">
                              No organization found.
                            </CommandEmpty>
                          ) : (
                            <CommandGroup>
                              {organizations.map((org) => (
                                <CommandItem
                                  value={org.name} // Search by name
                                  key={org.id} // Use category.id as unique key
                                  onSelect={() => {
                                    form.setValue("organization", org.id);
                                    setOrgOpenInline(false);
                                    paginationOrg.setSearch(""); // Clear search term after selection
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      org.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {org.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select an Organization for your item.
                  </FormDescription>
                </FormItem>
              )}
            />
          )}

          {user.role === USER_ROLE.ORGANIZATION_ADMIN && (
            <FormField
              control={form.control}
              name="shop"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Shop</FormLabel>
                  <Popover
                    open={openShop}
                    onOpenChange={(newOpen) => {
                      setShopOpenInline(newOpen);
                      if (!newOpen) {
                        paginationShop.setSearch(""); // Clear search term when closing
                      } else {
                        if (
                          !paginationShop.search &&
                          shops.length === 0 &&
                          !isLoading
                        ) {
                          searchShops();
                        }
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openShop}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                          // Disabled state now depends only on whether the API call is in progress
                          disabled={isLoading && openShop} // Disable the button itself if actively loading and popover is open
                        >
                          {isLoading && openShop ? ( // Show loader in button ONLY if popover is open and loading
                            <span className="flex items-center">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                              Loading...
                            </span>
                          ) : field.value ? (
                            selectedShopName || "Loading selected..." // Display name of selected, or "Loading" if not yet found
                          ) : (
                            "Select a Shop..."
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
                          placeholder="Search shop..."
                          value={paginationShop.search} // Controlled input
                          onValueChange={paginationShop.setSearch} // Update search term state on change
                        />
                        <CommandList>
                          {isLoading && openShop ? ( // Show loading indicator specifically when popover is open and fetching
                            <CommandEmpty className="py-6 text-center text-sm">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />{" "}
                              Fetching Shop...
                            </CommandEmpty>
                          ) : shops.length === 0 ? (
                            <CommandEmpty className="py-6 text-center text-sm">
                              No Shop found.
                            </CommandEmpty>
                          ) : (
                            <CommandGroup>
                              {shops.map((shop) => (
                                <CommandItem
                                  value={shop.name} // Search by name
                                  key={shop.id} // Use category.id as unique key
                                  onSelect={() => {
                                    form.setValue("shop", shop.id);
                                    setShopOpenInline(false);
                                    paginationShop.setSearch(""); // Clear search term after selection
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      shop.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {shop.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select an Shop for your item.
                  </FormDescription>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Role..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {USER_ROLE_OPTIONS.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select a role for this user.</FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 hover:bg-gray-600">
            {isLoading ? (
              <span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
            ) : actionType == "edit" ? (
              "Update User"
            ) : (
              "Add User"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
