"use client";
import { useAuth } from "@/components/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userService } from "@/lib/services/userService";
import { User, UserFilterType } from "@/type/user";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import UserForm from "@/components/admins/user/UserForm";
import { USER_ROLE } from "@/utils/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, Edit, MoreHorizontal } from "lucide-react";

import { PopoverContent } from "@/components/ui/popover";
import FilterBar, {
  FilterField,
} from "@/components/commens/filter-bar/FilterBar";
import { reportsService } from "@/lib/services/reportService";
import toast from "react-hot-toast";
import { usePagination } from "@/hook/usePagination";
import { USER_ROLE_OPTIONS } from "@/utils/constant";

export default function Page() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [usersData, setUsersData] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalUser, setTotalUser] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<User>();
  const [actionType, setActionType] = useState<string>("add");
  const [filters, setFilters] = useState<UserFilterType>();
  const pagination = usePagination();
  useEffect(() => {
    if (
      user?.role != USER_ROLE.ADMIN ||
      user?.role != USER_ROLE.ORGANIZATION_ADMIN
    ) {
      // router.push("/dashboard");
    }

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    getUserData();
  }, [pagination.page, filters]);

  const getUserData = () => {
    setIsLoading(true);
    userService
      .getUsers({
        page: pagination.page,
        page_size: pagination.pageSize,
        ...filters,
      })
      .then((res) => {
        setIsLoading(false);
        setUsersData(res.data.data.results);
        pagination.setTotalCount(res.data.data.count);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const handleUpdateButton = (userDetail: User) => {
    setUserDetail(userDetail);

    setActionType("edit");
    setOpen(true);
  };
  const userFilterConfig: FilterField[] = [
    {
      label: "search",
      name: "search",
      type: "text",
    },
    {
      label: "role",
      name: "role",
      type: "select",
      options: USER_ROLE_OPTIONS,
    },
  ];

  const generateReport = () => {
    reportsService
      .generateUsersReport(filters)
      .then((res) => {
        toast.success(res.data.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterChange = (filter: Record<string, string>) => {
    setFilters({ ...filter });
  };

  return (
    <div className="w-full px-2 lg:px-12">
      <div className="flex justify-between items-center bg-white py-4 my-2">
        <div className="flex-6/7">
          <FilterBar
            config={userFilterConfig}
            onFilterChange={handleFilterChange}
            generateReport={generateReport}
          />
        </div>
        <div className="flex-1/7">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-black hover:bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-lg shadow-lg">
              Add User
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add User</DialogTitle>
              </DialogHeader>
              <Separator />
              <UserForm
                setOpen={setOpen}
                getUsers={getUserData}
                actionType={actionType}
                userDetail={userDetail}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col justify-center ">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>User Id</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Org Name</TableHead>
              <TableHead>Shop Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData &&
              usersData.map((user: User, index) => (
                <TableRow key={index}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    {user?.first_name} {user?.middle_name} {user?.last_name}
                  </TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.role}</TableCell>
                  <TableCell>{user?.org_name}</TableCell>
                  <TableCell>{user?.shop_name}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal className="h-5 w-5 text-gray-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-18">
                        {/* <DropdownMenuLabel className="flex items-center text-gray-700 cursor-pointer">
                      <Popover >
                        <PopoverTrigger className="flex items-center text-gray-700 cursor-pointer">
                          <DeleteIcon className="mr-4 text-[12px]"/>
                      Delete
                        </PopoverTrigger>
                        <PopoverContent className="w-64">
                          are you sure to delete this book?
                          <div className="flex justify-center mt-4">
                              <Button className="text-red-600 bg-transparent outline-red-600">No</Button>
                              <Button className="text-green-600 bg-transparent outline-green-600" onClick={()=>handleDeleteBook(book.id)}>Yes</Button>
                          </div>
                          
                        </PopoverContent>
                      </Popover>
                    </DropdownMenuLabel> */}
                        <DropdownMenuLabel
                          className="flex item-center text-gray-700 cursor-pointer"
                          onClick={() => handleUpdateButton(user)}
                        >
                          <Edit className="mr-4 text-[12px]" />
                          Update
                        </DropdownMenuLabel>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Pagination className="self-start">
        <PaginationContent>
          <PaginationItem
            onClick={isLoading ? undefined : pagination.handlePrevPage}
          >
            <PaginationPrevious />
          </PaginationItem>
          {totalUser > 0 && (
            <>
              {
                <PaginationItem>
                  <PaginationLink>Total:{pagination.totalCount}</PaginationLink>
                </PaginationItem>
              }
            </>
          )}

          <PaginationItem
            onClick={isLoading ? undefined : pagination.handleNextPage}
            className={
              usersData.length === 0 ? "pointer-events-none opacity-50 " : ""
            }
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
