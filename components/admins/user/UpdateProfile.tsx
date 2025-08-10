import { User } from "@/type/user";
import { useForm } from "react-hook-form";
import { useAuth } from "../../AuthContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { userService } from "@/lib/services/userService";
import toast from "react-hot-toast";

type PropsType = {
  setOpenProfile: (openProfile: boolean) => void;
};
export default function UpdateProfile({ setOpenProfile }: PropsType) {
  const { user } = useAuth();
  const form = useForm<User>({ defaultValues: { ...user } });

  const onSubmit = (data: User) => {
    userService
      .updateProfile(data)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex flex-col lg:flex-row lg:items-center mt-10 ">
            <FormItem className="mr-3">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="py-4"
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
              <FormMessage />
            </FormItem>

            <FormItem className="">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="first_name"
                  {...form.register("first_name", {
                    required: "first name is required field",
                  })}
                />
              </FormControl>
              {form.formState.errors.first_name && (
                <FormDescription className="text-red text-sm">
                  {form.formState.errors.first_name.message}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center mt-10">
            <FormItem className="mr-3">
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="middle name"
                  {...form.register("middle_name", {
                    required: "middle name is required field",
                  })}
                />
              </FormControl>
              {form.formState.errors.middle_name && (
                <FormDescription className="text-red text-sm">
                  {form.formState.errors.middle_name.message}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>

            <FormItem className="">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="last_name"
                  {...form.register("last_name", {
                    required: "last name is required field",
                  })}
                />
              </FormControl>
              {form.formState.errors.last_name && (
                <FormDescription className="text-red text-sm">
                  {form.formState.errors.last_name.message}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          </div>

          <FormItem className="mt-10">
            <FormLabel>Contact Number</FormLabel>
            <FormControl>
              <Input
                placeholder="contact_number"
                {...form.register("contact_number", {
                  required: "Contact number is required field",
                })}
              />
            </FormControl>
            {form.formState.errors.contact_number && (
              <FormDescription className="text-red text-sm">
                {form.formState.errors.contact_number.message}
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>

          <Button type="submit" className="mt-10">
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
