import { useCart } from "@/components/CartContext";
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
import { usePagination } from "@/hook/usePagination";
import { diningTableService } from "@/lib/services/dinningTableService";
import { orderService } from "@/lib/services/orderService";
import { cn } from "@/lib/utils";
import { DinningTableType } from "@/type/dinning-table.model";
import { OrderType } from "@/type/order.model";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function Checkout() {
  const form = useForm<OrderType>();
  const pagination = usePagination();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [diningTables, setDiningTables] = useState<DinningTableType[]>([]);
  const [openDining, setOpenDining] = useState<boolean>(false);
  const params = useParams();
  const { cartItems, totalPrice, clearCart } = useCart();
  const router = useRouter();

  //websocket start

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!params.restaurantId) return;

    const accessToken = localStorage.getItem("access");
    socketRef.current = new WebSocket(
      `ws://localhost:8000/ws/orders/${params.restaurantId?.toLocaleString()}/?token=${accessToken}`,
    );
    console.log(socketRef.current);
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      clearCart();
      router.push(`/${params.restaurantId}/orderlist`);
      setIsLoading(false);

      console.log(data);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [params.restaurantId?.toLocaleString()]);

  //websocket end

  const selectedMenuName = useMemo(() => {
    const diningTableFound = diningTables.find(
      (category) => category.id === form.getValues("table_number"),
    )?.name;
    if (diningTableFound) {
      return diningTableFound;
    }
    if (diningTables.length > 0 && form.getValues("table_number")) {
      diningTableService
        .getDiningTable(form.getValues("table_number") || "")
        .then((res) => {
          setDiningTables((prev) => [...prev, res.data.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [diningTables, form.getValues("table_number")]);

  const searchDiningTables = () => {
    setIsLoading(true);
    diningTableService
      .getDiningTables({
        page: pagination.page,
        page_size: 40,
        search: pagination.search,
        shop_id: params.restaurantId?.toLocaleString(),
      })
      .then((res) => {
        setDiningTables(res.data.data.results);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const submitOrder = (orderData: OrderType) => {
    if (!socketRef.current) return;
    if (socketRef.current.readyState == WebSocket.OPEN) {
      const data = {
        items: cartItems,
        shop: params.restaurantId,
        total_price: totalPrice,
        table_number: orderData.table_number,
      };
      // setIsLoading(true);

      socketRef.current.send(JSON.stringify({ ...data }));
    }

    // orderService
    //   .addOrder(data)
    //   .then((res) => {
    //     clearCart();
    //     router.push(`/${params.restaurantId}/orderlist`);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    searchDiningTables();
  }, []);

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitOrder)}>
          <FormField
            control={form.control}
            name="table_number"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-6">
                <FormLabel>Table Number</FormLabel>
                <Popover
                  open={openDining}
                  onOpenChange={(newOpen) => {
                    setOpenDining(newOpen);
                    if (!newOpen) {
                      pagination.setSearch(""); // Clear search term when closing
                    } else {
                      if (
                        !pagination.search &&
                        diningTables.length === 0 &&
                        !isLoading
                      ) {
                        searchDiningTables();
                      }
                    }
                  }}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openDining}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground ",
                        )}
                        // Disabled state now depends only on whether the API call is in progress
                        disabled={isLoading && openDining} // Disable the button itself if actively loading and popover is open
                      >
                        {isLoading && openDining ? ( // Show loader in button ONLY if popover is open and loading
                          <span className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            Loading...
                          </span>
                        ) : field.value ? (
                          selectedMenuName || "Loading selected..." // Display name of selected, or "Loading" if not yet found
                        ) : (
                          "Select a dining table..."
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
                        value={pagination.search} // Controlled input
                        onValueChange={pagination.setSearch} // Update search term state on change
                      />
                      <CommandList>
                        {isLoading && openDining ? ( // Show loading indicator specifically when popover is open and fetching
                          <CommandEmpty className="py-6 text-center text-sm">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />{" "}
                            Fetching menu dining...
                          </CommandEmpty>
                        ) : diningTables.length === 0 ? (
                          <CommandEmpty className="py-6 text-center text-sm">
                            No menu dining table found.
                          </CommandEmpty>
                        ) : (
                          <CommandGroup>
                            {diningTables.map((cat) => (
                              <CommandItem
                                value={cat.name} // Search by name
                                key={cat.id} // Use category.id as unique key
                                onSelect={() => {
                                  form.setValue("table_number", cat.id || "");
                                  setOpenDining(false);
                                  pagination.setSearch(""); // Clear search term after selection
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
                  Select an Dining for your item.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            className={`${
              isLoading ? "bg-[#C71F37]/50" : "bg-[#C71F37]"
            } hover:scale-125 hover:bg-[#C71F37] text-white px-16 py-6 mt-16 rounded-md `}
            type="submit"
            disabled={isLoading}
          >
            Order
          </Button>
        </form>
      </Form>
    </div>
  );
}
