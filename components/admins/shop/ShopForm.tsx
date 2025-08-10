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
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShopType } from "@/type/shops.model";
import { shopService } from "@/lib/services/shopsService";
import { useState } from "react";

import toast from "react-hot-toast";
import { fileService } from "@/lib/services/fileService";
import { useAuth } from "../../AuthContext";
import MapPicker from "./MapPicker";

interface PropsType {
  setOpen: (open: boolean) => void;
  getshops: () => void;
  actionType: string;
  shopDetail?: ShopType;
}

export default function AddBook({
  setOpen,
  getshops,
  actionType,
  shopDetail,
}: PropsType) {
  const form = useForm<ShopType>({
    defaultValues: { ...shopDetail },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [fileId, setFileId] = useState<string>("");
  const [locationData, setLocationData] = useState<number[]>([0, 0]);

  const onSubmit = (data: ShopType) => {
    // data.published_date = format(data.published_date)
    data.lat = locationData[0];
    data.lng = locationData[1];
    if (fileId != "") {
      data.shop_logo = fileId;
    }
    if (actionType === "add") {
      data.organization = user.organization;
      data.shop_logo = fileId;
      setIsLoading(true);
      shopService
        .addShop(data)
        .then(() => {
          toast.success("Book has been created sucessfuly");
          setIsLoading(false);
          setOpen(false);
          getshops();
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    } else if (actionType === "edit") {
      shopService
        .updateShop(data)
        .then(() => {
          toast.success("Book has been updated sucessfuly");
          setIsLoading(false);
          setOpen(false);
          getshops();
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
  const onMapChange = (data: any) => {
    setLocationData(data);
  };

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormItem className="">
            <FormLabel>name</FormLabel>
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
            <FormMessage />
          </FormItem>

          <FormItem className="mt-4">
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
                {form.formState.errors.description?.message}
              </FormDescription>
            )}
          </FormItem>

          <FormItem className="mt-4">
            <FormLabel>address</FormLabel>
            <FormControl>
              <Input
                placeholder="address"
                {...form.register("address", {
                  required: "address is required field",
                })}
              />
            </FormControl>
            {form.formState.errors.address && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.address?.message}
              </FormDescription>
            )}
          </FormItem>

          <FormItem className="mt-4">
            <FormLabel> Location</FormLabel>
            <Controller
              name="location"
              control={form.control}
              render={({ field }) => (
                <MapPicker value={field.value} onChange={onMapChange} />
              )}
            />
          </FormItem>

          <FormItem className="mt-4 mb-4">
            <FormLabel>Logo</FormLabel>
            <FormControl>
              <Input
                placeholder="shop logo"
                type="file"
                onChange={handleChange}
              />
            </FormControl>
          </FormItem>

          <Button type="submit" className="mt-4 hover:bg-gray-600">
            {isLoading ? (
              <span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
            ) : actionType == "edit" ? (
              "Update Shop"
            ) : (
              "Add Shop"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
