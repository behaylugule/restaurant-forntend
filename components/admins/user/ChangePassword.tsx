import { ChangePasswordType } from "@/type/user";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";
import { userService } from "@/lib/services/userService";
import toast from "react-hot-toast";

interface PropsType {
  setOpen: (open: boolean) => void;
}

export default function Page({ setOpen }: PropsType) {
  const form = useForm<ChangePasswordType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isMatch, setMatch] = useState(true);
  const onSubmit = (data: ChangePasswordType) => {
    setIsLoading(true);
    userService
      .changePassword(data)
      .then((res: any) => {
        setIsLoading(false);

        if (res.data.data.error) {
          toast.error(res.data.data.error);
        } else {
          toast.success(res.data.data.message);
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormItem className="mt-4">
          <FormLabel>Old Password</FormLabel>
          <FormControl>
            <Input
              placeholder="Old password"
              type="password"
              {...form.register("old_password", {
                required: "old_password is required field",
              })}
            />
          </FormControl>
          {form.formState.errors.old_password && (
            <FormDescription className="text-red text-sm">
              {form.formState.errors.old_password.message}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>

        <FormItem className="mt-3">
          <FormLabel>New Password</FormLabel>
          <FormControl>
            <Input
              placeholder="new password"
              type="password"
              {...form.register("new_password", {
                required: "new password is requird field",
              })}
            />
          </FormControl>
          {form.formState.errors.new_password && (
            <FormDescription>
              {form.formState.errors.new_password.message}
            </FormDescription>
          )}
        </FormItem>

        <FormItem className="mt-3">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input
              placeholder="confirm_password"
              type="password"
              {...form.register("confirm_password", {
                required: "confirm password is required field",
              })}
              onChange={(e) =>
                setMatch(e.target.value == form.getValues("new_password"))
              }
            />
          </FormControl>
          {isMatch ? (
            ""
          ) : (
            <FormMessage className="text-red-600 text-sm">
              password is not match
            </FormMessage>
          )}
        </FormItem>

        <Button type="submit" className="mt-4 hover:bg-gray-600">
          {isLoading ? (
            <span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </Form>
  );
}
