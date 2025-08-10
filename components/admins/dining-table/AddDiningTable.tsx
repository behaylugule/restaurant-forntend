import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { diningTableService } from "@/lib/services/dinningTableService";
import { DinningTableType } from "@/type/dinning-table.model";
import { useState } from "react";
import { useForm } from "react-hook-form";

type PropsType = {
  setOpen: (value: boolean) => void;
  getDiningTables: () => void;
  actionType: string;
  diningTablesDetail?: DinningTableType;
};

export default function AddDiningTable({
  setOpen,
  getDiningTables,
  actionType,
  diningTablesDetail,
}: PropsType) {
  const form = useForm<DinningTableType>({
    defaultValues: {
      ...diningTablesDetail,
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = (data: DinningTableType) => {
    if (actionType === "add") {
      setIsLoading(true);
      diningTableService
        .addDiningTables(data)
        .then((res) => {
          setIsLoading(false);
          getDiningTables();
          setOpen(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else if (actionType === "edit") {
      if (!data.id) return;
      setIsLoading(true);
      diningTableService
        .updateDiningTable(data.id, data)
        .then((res) => {
          getDiningTables();
          setOpen(false);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  };
  return (
    <div className="mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="name"
                {...form.register("name", {
                  required: "Name is required",
                })}
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Table Number</FormLabel>
            <FormControl>
              <Input
                placeholder="Dining Table"
                type="number"
                {...form.register("table_number", {
                  required: "Name is required",
                })}
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Capacity</FormLabel>
            <FormControl>
              <Input
                placeholder="Capacity"
                type="number"
                {...form.register("number_set", {
                  required: "Capacity is required",
                })}
              />
            </FormControl>
          </FormItem>
          <Button>
            {isLoading ? (
              <span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
            ) : actionType == "edit" ? (
              "Update Dining Table"
            ) : (
              "Add Dining Table"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
