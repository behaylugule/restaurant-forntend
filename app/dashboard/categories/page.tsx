"use client";

import AddCategory from "@/components/admins/category/AddCategory";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CategoryModel } from "@/type/category.model";
import { useEffect, useState } from "react";
import { categoryService } from "@/lib/services/categoryService";
import { usePagination } from "@/hook/usePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, Edit, MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Page() {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categoriesData, setCategoriesData] = useState<CategoryModel[]>([]);
  const [actionType, setActionType] = useState<string>("add");
  const [categoryDetail, setCategoryDetail] = useState<CategoryModel>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pagination = usePagination();
  const getCategories = () => {
    setIsLoading(true);
    categoryService
      .getCategories({
        page: pagination.page,
        page_size: pagination.pageSize,
        search: pagination.search,
      })
      .then((res) => {
        pagination.setTotalCount(res.data.data.count);
        setCategoriesData(res.data.data.results);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, [pagination.page, pagination.search, pagination.pageSize]);

  const handleUpdateCategory = (catagoryDetail: CategoryModel) => {
    setCategoryDetail(catagoryDetail);

    setActionType("edit");
    setOpen(true);
  };

  const handleDeleteCategory = async (id: string) => {
    setIsLoading(true);
    categoryService
      .deleteCategory(id)
      .then((res) => {
        setIsLoading(false);
        setCategoriesData((prev) => {
          return prev.filter((category: any) => category?.id !== id);
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (!open) {
      setActionType("add");
      setCategoryDetail({
        id: "",
        name: "",
        description: "",
        image: "",
        create_date: "",
        update_date: "",
      });
    }
  }, [open]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-2 lg:px-12 py-4">
        <input
          className="w-[250px] lg:max-w-md bg-white px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="search"
          onChange={(e) => pagination.setSearch(e.target.value)}
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="bg-black hover:bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-lg shadow-lg">
            Add Category
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>
            <Separator />

            <AddCategory
              setOpen={setOpen}
              actionType={actionType}
              categoryDetail={categoryDetail}
              getCategories={getCategories}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col justify-center px-2 lg:px-12">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>Category Id</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              categoriesData?.map((category, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      {format(category?.create_date, "d/m/yyyy")}
                    </TableCell>
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
                                are you sure to delete this category?
                                <div className="flex justify-center mt-4">
                                  <Button className="text-red-600 bg-transparent outline-red-600">
                                    No
                                  </Button>
                                  <Button
                                    className="text-green-600 bg-transparent outline-green-600"
                                    onClick={() =>
                                      handleDeleteCategory(category.id || "")
                                    }
                                  >
                                    Yes
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </DropdownMenuLabel>
                          <DropdownMenuLabel
                            className="flex item-center text-gray-700 cursor-pointer"
                            onClick={() => handleUpdateCategory(category)}
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
            {
              //  pagination.totalCount>0&&
              <>
                {
                  <PaginationItem>
                    <PaginationLink>
                      Total:{pagination.totalCount}
                    </PaginationLink>
                  </PaginationItem>
                }
              </>
            }

            <PaginationItem
              onClick={isLoading ? undefined : pagination.handleNextPage}
              className={
                categoriesData.length === 0
                  ? "pointer-events-none opacity-50 "
                  : ""
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
