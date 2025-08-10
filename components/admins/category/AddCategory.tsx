import { CategoryModel } from "@/type/category.model";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { categoryService } from "@/lib/services/categoryService";
import { useState } from "react";
import { fileService } from "@/lib/services/fileService";

type PropsType = {
  setOpen: (value: boolean) => void;
  getCategories: () => void;
  actionType: string;
  categoryDetail?: CategoryModel;
};

export default function AddCategory({
  setOpen,
  getCategories,
  actionType,
  categoryDetail,
}: PropsType) {
  const form = useForm<CategoryModel>({ defaultValues: { ...categoryDetail } });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileId, setFileId] = useState<string>("");

  const onSubmit = (data: CategoryModel) => {
    data.image = fileId;
    if (actionType === "add") {
      setIsLoading(true);
      categoryService
        .createCategory(data)
        .then((res) => {
          setIsLoading(false);
          getCategories();
          setOpen(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else if (actionType === "edit") {
      categoryService
        .updateCategory(data?.id || "", data)
        .then((res) => {
          getCategories();
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
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

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="name"
                {...form.register("name", {
                  required: "Category name is required",
                })}
              />
            </FormControl>
          </FormItem>

          <FormItem className="mt-4">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input
                placeholder="description"
                {...form.register("description", {
                  required: "Category description is required",
                })}
              />
            </FormControl>
          </FormItem>

          <FormItem className="mt-4 mb-4">
            <FormLabel>Category Photo</FormLabel>
            <FormControl>
              <Input placeholder="Image" type="file" onChange={handleChange} />
            </FormControl>
          </FormItem>

          <Button type="submit" className="mt-4 hover:bg-gray-600">
            {isLoading ? (
              <span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
            ) : actionType == "edit" ? (
              "Update Category"
            ) : (
              "Add Category"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
