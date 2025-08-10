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
import { menuService } from "@/lib/services/menuService";
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
import AddMenu from "@/components/admins/menu/AddMenu";
import { Separator } from "@/components/ui/separator";
import { MenuFilterType, MenuType } from "@/type/menu.model";

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
import { categoryService } from "@/lib/services/categoryService";
import { reportsService } from "@/lib/services/reportService";
import toast from "react-hot-toast";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [menusData, setmenusData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("add");
  const [menuDetail, setmenuDetail] = useState<MenuType>();
  const pagination = usePagination();
  const paginationCategory = usePagination();
  const [filterType, setFilterType] = useState<MenuFilterType>();
  const [categoriesMenuData, setCategoriesMenuData] = useState<MenuType[]>([]);
  const [isCatMenuLoading, setIsCatMenuLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getmenus();
  }, [pagination.page, filterType]);

  const getmenus = () => {
    menuService
      .getMenus({
        page: pagination.page,
        page_size: pagination.pageSize,
        ...filterType,
      })
      .then((res) => {
        setIsLoading(false);
        setmenusData(res.data.data.results);
        pagination.setTotalCount(res.data.data.count);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleUpdateButton = (menuDetail: MenuType) => {
    setmenuDetail(menuDetail);

    setActionType("edit");
    setOpen(true);
  };

  const handleDeleteBook = async (id: string) => {
    setIsLoading(true);
    menuService
      .deleteMenu(id)
      .then((res) => {
        setIsLoading(false);
        setmenusData((prev) => {
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
      setmenuDetail({
        id: "",
        name: "",
        description: "",
        menu_category: "",
        image: "",
      });
      setActionType("add");
    }
  }, [open]);

  const getMenuCategories = () => {
    categoryService
      .getCategories({
        page: paginationCategory.page,
        page_size: 1000,
        search: paginationCategory.search,
      })
      .then((res) => {
        setCategoriesMenuData(res.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMenuCategories();
  }, [paginationCategory.search]);

  const menuFilterConfig: FilterField[] = [
    { label: "search", name: "search", type: "text" },
    {
      label: "menu_category",
      name: "menu_category",
      type: "select",
      search: paginationCategory.search,
      setSearch: paginationCategory.setSearch,
      searchItems: getMenuCategories,
      data: categoriesMenuData,
      isLoading: isCatMenuLoading,
      from_db: true,
    },
  ];

  const handleMenuFilter = (filter: Record<string, string>) => {
    setFilterType({ ...filter });
  };
  const generateReport = () => {
    reportsService
      .generateMenuReport(filterType)
      .then((res) => {
        toast.success(res.data.data.message);
      })
      .catch((err) => {});
  };

  return (
    <div className="w-full px-2 lg:px-12">
      <div className="flex justify-between items-center px-2 lg:px-12 py-4 bg-white my-6">
        <div className="flex-6/7">
          <FilterBar
            config={menuFilterConfig}
            onFilterChange={handleMenuFilter}
            generateReport={generateReport}
          />
        </div>
        <div className="flex-1/7">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-black hover:bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-lg shadow-lg">
              Add Menu
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Menu</DialogTitle>
              </DialogHeader>
              <Separator />
              <AddMenu
                setOpen={setOpen}
                getMenus={getmenus}
                actionType={actionType}
                menuDetail={menuDetail}
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
              <TableHead>Price</TableHead>
              <TableHead>Preparation Time</TableHead>
              <TableHead>Description</TableHead>

              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              menusData.map((menu: any, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{menu?.id}</TableCell>
                    <TableCell>{menu?.name}</TableCell>
                    <TableCell>{menu?.price}</TableCell>
                    <TableCell>{menu?.preparation_time}</TableCell>
                    <TableCell>{menu?.description}</TableCell>

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
                                are you sure to delete this book?
                                <div className="flex justify-center mt-4">
                                  <Button className="text-red-600 bg-transparent outline-red-600">
                                    No
                                  </Button>
                                  <Button
                                    className="text-green-600 bg-transparent outline-green-600"
                                    onClick={() => handleDeleteBook(menu.id)}
                                  >
                                    Yes
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </DropdownMenuLabel>
                          <DropdownMenuLabel
                            className="flex item-center text-gray-700 cursor-pointer"
                            onClick={() => handleUpdateButton(menu)}
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
                menusData.length === 0 ? "pointer-events-none opacity-50 " : ""
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
