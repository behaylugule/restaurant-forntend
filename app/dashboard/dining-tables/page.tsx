"use client";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DinningTableType } from "@/type/dinning-table.model";
import { usePagination } from "@/hook/usePagination";
import { USER_ROLE } from "@/utils/utils";
import { diningTableService } from "@/lib/services/dinningTableService";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { DeleteIcon, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import AddDiningTable from "@/components/admins/dining-table/AddDiningTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function DiningTables() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [diningTableData, setDiningTableData] = useState<DinningTableType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("add");
  const [diningTableDetail, setdiningTableDetail] =
    useState<DinningTableType>();
  const pagination = usePagination();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, []);
  useEffect(() => {
    if (user?.role !== USER_ROLE.SHOP_ADMIN) router.push("/");
  }, [user?.id]);

  const getDiningTables = () => {
    setIsLoading(true);
    diningTableService
      .getDiningTables({
        page: pagination.page,
        page_size: pagination.pageSize,
        search: pagination.search,
      })
      .then((res) => {
        setIsLoading(false);
        setDiningTableData(res.data.data.results);
        pagination.setTotalCount(res.data.data.count);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleUpadateButton = (diningTableDetail: DinningTableType) => {
    setdiningTableDetail(diningTableDetail);
    setActionType("edit");
    setOpen(true);
  };

  const handleDeleteDiningTable = async (id?: string) => {
    if (!id) return;
    setIsLoading(true);
    diningTableService.deleteDiningTable(id).then((res) => {
      setIsLoading(false);
      setDiningTableData((prev) => {
        return prev.filter((item: any) => item.id !== id);
      });
    });
  };
  useEffect(() => {
    if (!open) {
      setdiningTableDetail(undefined);
      setActionType("add");
    }
  }, [open]);

  useEffect(() => {
    getDiningTables();
  }, [pagination.page, pagination.search, pagination.pageSize]);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-2 lg:px-12 py-4 ">
        <input
          className="w-[250px] lg:max-w-md bg-white px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by name"
          onChange={(e) => pagination.setSearch(e.target.value)}
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="bg-black hover:bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-lg shadow-lg ">
            Add Dining Table
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Dining Table</DialogTitle>
            </DialogHeader>
            <Separator />
            <AddDiningTable
              setOpen={setOpen}
              actionType={actionType}
              getDiningTables={getDiningTables}
              diningTablesDetail={diningTableDetail}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col justify-center px-2 lg:px-12">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Dining Number</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              diningTableData.map((diningTable: DinningTableType, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{diningTable.id}</TableCell>
                    <TableCell>{diningTable.name}</TableCell>
                    <TableCell>{diningTable.table_number}</TableCell>
                    <TableCell>{diningTable.number_set}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-5 w-5 text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-18">
                          <DropdownMenuLabel className="flex items-center tect-gray-700 cursor-pointer">
                            <Popover>
                              <Popover>
                                <PopoverTrigger className="flex items-center text-gray-700 cursor-pointer">
                                  <DeleteIcon />
                                  Delete
                                </PopoverTrigger>
                                <PopoverContent className="w-64">
                                  are you sure to delete this shop
                                  <div className="flex justify-center mt-4">
                                    <Button className="text-red-600 bg-transparent outline-green-600">
                                      No
                                    </Button>
                                    <Button
                                      className="text-green-600 bg-transparent outline-red-600"
                                      onClick={() =>
                                        handleDeleteDiningTable(diningTable?.id)
                                      }
                                    >
                                      Yes
                                    </Button>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </Popover>
                          </DropdownMenuLabel>
                          <DropdownMenuLabel
                            className="flex items-center text-gray-700"
                            onClick={() => handleUpadateButton(diningTable)}
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
              <PaginationItem>
                <PaginationLink>Total:{pagination.totalCount}</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem
              onClick={isLoading ? undefined : pagination.handleNextPage}
              className={
                diningTableData.length == 0
                  ? "pointer-events-none opacity-50"
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
