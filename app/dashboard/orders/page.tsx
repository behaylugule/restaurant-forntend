"use client";
import { useAuth } from "@/components/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { OrderFilterType, OrderType } from "@/type/order.model";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hook/usePagination";
import { orderService } from "@/lib/services/orderService";
import { ORDER_STATUS } from "@/utils/utils";
import Link from "next/link";
import { reportsService } from "@/lib/services/reportService";
import toast from "react-hot-toast";
import FilterBar, {
  FilterField,
} from "@/components/commens/filter-bar/FilterBar";
import { ORDER_STATUS_OPTION } from "@/utils/constant";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [ordersData, setOrderData] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pagination = usePagination();
  const [filterType, setFilterType] = useState<OrderFilterType>();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getshops();
  }, [pagination.page, pagination.search, filterType]);

  const getshops = () => {
    orderService
      .getOrders({
        page: pagination.page,
        page_size: pagination.pageSize,
        ...filterType,
      })
      .then((res) => {
        setIsLoading(false);
        setOrderData(res.data.data.results);

        pagination.setTotalCount(res.data.data.count);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleUpdateButton = (status: string) => {};
  const generateReport = () => {
    reportsService
      .generateOrderReport(filterType)
      .then((res) => {
        console.log(res);
        toast.success(res.data.data.message);
      })
      .catch((err) => {});
  };

  const menuFilterConfig: FilterField[] = [
    {
      label: "status",
      name: "status",
      type: "select",
      options: ORDER_STATUS_OPTION,
    },
    { label: "Search", name: "search", type: "text" },
    {
      label: "Order Date",
      name: "order_date",
      type: "date",
    },
  ];
  const handleMenuFilter = (filter: Record<string, string>) => {
    setFilterType({ ...filter });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-2 lg:px-12 py-4">
        <FilterBar
          config={menuFilterConfig}
          onFilterChange={handleMenuFilter}
          generateReport={generateReport}
        />
      </div>
      <div className="flex flex-col justify-center px-2 lg:px-12">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>total Price</TableHead>
              <TableHead>Status</TableHead>

              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              ordersData.map((order: any, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="flex items-center justify-center">
                      <Link
                        href={`/dashboard/orders/${order.id.toString()}`}
                        className="w-full h-full text-[#C71F37]"
                      >
                        {order?.id}
                      </Link>
                    </TableCell>
                    <TableCell>{order?.username}</TableCell>
                    <TableCell>{order?.total_price}</TableCell>
                    <TableCell>{order?.status}</TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-5 w-5 text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-18">
                          <DropdownMenuLabel className="flex items-center text-gray-700 cursor-pointer">
                            <Popover>
                              <PopoverTrigger className="flex items-center text-gray-700 cursor-pointer">
                                Complete
                              </PopoverTrigger>
                              <PopoverContent className="w-64">
                                are you sure to complete the order?
                                <div className="flex justify-center mt-4">
                                  <Button className="text-red-600 bg-transparent outline-red-600">
                                    No
                                  </Button>
                                  <Button
                                    className="text-green-600 bg-transparent outline-green-600"
                                    onClick={() =>
                                      handleUpdateButton(ORDER_STATUS.COMPLETED)
                                    }
                                  >
                                    Yes
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </DropdownMenuLabel>
                          <DropdownMenuLabel className="flex items-center text-gray-700 cursor-pointer">
                            <Popover>
                              <PopoverTrigger className="flex items-center text-gray-700 cursor-pointer">
                                Cancle
                              </PopoverTrigger>
                              <PopoverContent className="w-64">
                                are you sure to cancle the order?
                                <div className="flex justify-center mt-4">
                                  <Button className="text-red-600 bg-transparent outline-red-600">
                                    No
                                  </Button>
                                  <Button
                                    className="text-green-600 bg-transparent outline-green-600"
                                    onClick={() =>
                                      handleUpdateButton(ORDER_STATUS.CANCLED)
                                    }
                                  >
                                    Yes
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </DropdownMenuLabel>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Pagination className="self-start">
          <PaginationContent>
            <PaginationItem
              onClick={isLoading ? undefined : pagination.handlePrevPage}
            >
              <PaginationPrevious />
            </PaginationItem>
            {pagination.totalCount > 0 && (
              <>
                {
                  <PaginationItem>
                    <PaginationLink>
                      Total:{pagination.totalCount}
                    </PaginationLink>
                  </PaginationItem>
                }
              </>
            )}

            <PaginationItem
              onClick={isLoading ? undefined : pagination.handleNextPage}
              className={
                ordersData.length === 0 ? "pointer-events-none opacity-50 " : ""
              }
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
