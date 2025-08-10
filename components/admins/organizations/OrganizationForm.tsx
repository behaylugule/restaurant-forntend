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
import { OrganizationsCreateModel } from "@/type/organization";
import { organizationsService } from "@/lib/services/organizationService";
import { useState } from "react";

import toast from "react-hot-toast";

interface PropsType {
  setOpen: (open: boolean) => void;
  getOrganizations: () => void;
  actionType: string;
  organizationDetail?: OrganizationsCreateModel;
}

export default function AddBook({
  setOpen,
  getOrganizations,
  actionType = "add",
  organizationDetail,
}: PropsType) {
  const form = useForm<OrganizationsCreateModel>({
    defaultValues: { ...organizationDetail },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: OrganizationsCreateModel) => {
    // data.published_date = format(data.published_date)
    if (actionType === "add") {
      setIsLoading(true);
      organizationsService
        .addOrganizations(data)
        .then(() => {
          toast.success("Book has been created sucessfuly");
          setIsLoading(false);
          setOpen(false);
          getOrganizations();
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    } else if (actionType === "edit") {
      organizationsService
        .updateOrganizations(data)
        .then(() => {
          toast.success("Book has been updated sucessfuly");
          setIsLoading(false);
          setOpen(false);
          getOrganizations();
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
            <FormLabel>code</FormLabel>
            <FormControl>
              <Input
                placeholder="code"
                {...form.register("code", {
                  required: "code is required field",
                })}
              />
            </FormControl>
            {form.formState.errors.code && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.code?.message}
              </FormDescription>
            )}
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
            {form.formState.errors.code && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.description?.message}
              </FormDescription>
            )}
          </FormItem>

          <FormItem className="mt-4 mb-4">
            <FormLabel>contact_number</FormLabel>
            <FormControl>
              <Input
                placeholder="contact_number"
                {...form.register("contact_number", {
                  required: "contact_number is required field",
                })}
              />
            </FormControl>
            {form.formState.errors.contact_number && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.contact_number?.message}
              </FormDescription>
            )}
          </FormItem>

          <FormItem className="mt-4 mb-4">
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

          <FormItem className="mt-4 mb-4">
            <FormLabel>website</FormLabel>
            <FormControl>
              <Input
                placeholder="website"
                {...form.register("website", {
                  required: "adwebsitedress is required field",
                })}
              />
            </FormControl>
            {form.formState.errors.website && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.website?.message}
              </FormDescription>
            )}
          </FormItem>

          <Button type="submit" className="mt-4 hover:bg-gray-600">
            {isLoading ? (
              <span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
            ) : actionType == "edit" ? (
              "Update Book"
            ) : (
              "Add Book"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
