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

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hook/usePagination";
import { menuRateService } from "@/lib/services/menurate.service";
import { MenuRateType } from "@/type/menurate.model";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [menuOrdersData, setMenuOrderData] = useState<MenuRateType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pagination = usePagination();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getMenuRate();
  }, [pagination.page, pagination.search]);

  const getMenuRate = () => {
    menuRateService
      .getMenuRate({
        page: pagination.page,
        search: pagination.search,
        page_size: pagination.pageSize,
      })
      .then((res) => {
        setIsLoading(false);
        setMenuOrderData(res.data.data.results);
        pagination.setTotalCount(res.data.data.count);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-2 lg:px-12 py-4">
        <h1>Feed Back</h1>
      </div>
      <div className="flex flex-col justify-center px-2 lg:px-12">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>menu</TableHead>
              <TableHead>rate</TableHead>
              <TableHead>comment</TableHead>
              <TableHead>username</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              menuOrdersData.map((order: any, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="flex items-center justify-center">
                      {order?.id}
                    </TableCell>
                    <TableCell>{order?.menu_name}</TableCell>
                    <TableCell>{order?.rate}</TableCell>
                    <TableCell>{order?.comment}</TableCell>
                    <TableCell>{order?.username}</TableCell>
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
                menuOrdersData.length === 0
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
