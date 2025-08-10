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
import { DeleteIcon, Edit, MoreHorizontal } from "lucide-react";
import { shopService } from "@/lib/services/shopsService";
import { Skeleton } from "@/components/ui/skeleton";
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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Addshop from "@/components/admins/shop/ShopForm";
import { Separator } from "@/components/ui/separator";
import { ShopFilterType, ShopType } from "@/type/shops.model";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hook/usePagination";
import FilterBar, {
  FilterField,
} from "@/components/commens/filter-bar/FilterBar";
import { reportsService } from "@/lib/services/reportService";
import toast from "react-hot-toast";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [shopsData, setshopsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("add");
  const [shopDetail, setshopDetail] = useState<ShopType>();
  const pagination = usePagination();
  const [filterType, setFilterType] = useState<ShopFilterType>();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getshops();
  }, [pagination.page, filterType]);

  const getshops = () => {
    shopService
      .getShops({
        page: pagination.page,
        page_size: pagination.pageSize,
        ...filterType,
      })
      .then((res) => {
        setIsLoading(false);
        setshopsData(res.data.data.results);
        pagination.setTotalCount(res.data.data.count);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleUpdateButton = (shopDetail: ShopType) => {
    setshopDetail(shopDetail);

    setActionType("edit");
    setOpen(true);
  };

  const handleDeleteBook = async (id: string) => {
    setIsLoading(true);
    shopService
      .deleteShop(id)
      .then((res) => {
        setIsLoading(false);
        setshopsData((prev) => {
          return prev.filter((book: any) => book?.id !== id);
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (!open) {
      setshopDetail({
        id: "",
        name: "",
        description: "",
        shop_logo: "",
        organization: "",
      });
      setActionType("add");
    }
  }, [open]);

  const menuFilterConfig: FilterField[] = [
    {
      label: "search",
      name: "search",
      type: "text",
    },
  ];
  const generateReport = () => {
    reportsService
      .generateShopReport({ ...filterType })
      .then((res) => {
        toast.success(res.data.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterChange = (filter: Record<string, string>) => {
    setFilterType({ ...filter });
  };

  return (
    <div className="w-full px-2 lg:px-12">
      <div className="flex justify-between bg-white items-center  py-4 my-5">
        <div className="flex-6/7">
          <FilterBar
            config={menuFilterConfig}
            generateReport={generateReport}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="flex-1/7">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-black hover:bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-lg shadow-lg">
              Add Shop
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Shop</DialogTitle>
              </DialogHeader>
              <Separator />
              <Addshop
                setOpen={setOpen}
                getshops={getshops}
                actionType={actionType}
                shopDetail={shopDetail}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col justify-center ">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Address</TableHead>

              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              shopsData.map((book: any, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{book?.id}</TableCell>
                    <TableCell>{book?.name}</TableCell>
                    <TableCell>{book?.code}</TableCell>
                    <TableCell>{book?.description}</TableCell>
                    <TableCell>{book?.address}</TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-5 w-5 text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-18">
                          <DropdownMenuLabel className="flex items-center text-gray-700 cursor-pointer">
                            <Popover>
                              <PopoverTrigger className="flex items-center text-gray-700 cursor-pointer">
                                <DeleteIcon className="mr-4 text-[12px]" />
                                Delete
                              </PopoverTrigger>
                              <PopoverContent className="w-64">
                                are you sure to delete this shop?
                                <div className="flex justify-center mt-4">
                                  <Button className="text-red-600 bg-transparent outline-red-600">
                                    No
                                  </Button>
                                  <Button
                                    className="text-green-600 bg-transparent outline-green-600"
                                    onClick={() => handleDeleteBook(book.id)}
                                  >
                                    Yes
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </DropdownMenuLabel>
                          <DropdownMenuLabel
                            className="flex item-center text-gray-700 cursor-pointer"
                            onClick={() => handleUpdateButton(book)}
                          >
                            <Edit className="mr-4 text-[12px]" />
                            Update
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
                shopsData.length === 0 ? "pointer-events-none opacity-50 " : ""
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
