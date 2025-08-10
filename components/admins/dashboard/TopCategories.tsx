"use client";
import { FilterIcon, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { usePagination } from "@/hook/usePagination";
import { organizationsService } from "@/lib/services/organizationService";
import { useEffect, useState } from "react";
import {
  OrganizationsCountModel,
  OrganizationsCreateModel,
} from "@/type/organization";

export default function TopCategories() {
  const pagination = usePagination();
  const [bookCountData, setBookCountData] = useState<OrganizationsCountModel[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getBooksNumberWithCatagory();
  }, [pagination.page, pagination.search]);

  const getBooksNumberWithCatagory = () => {};

  return (
    <div className="w-full bg-white w-full rounded-xl shadow-xl mb-10 pb-10 pt-5">
      <div className="flex items-center justify-between mb-4 px-6 ">
        <h3 className="text-[16px] font-medium text-gray-600">
          Number of Books
        </h3>
        <div className="flex items-center gap-4">
          <input
            className="max-w-[200px] bg-white px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="search"
            onChange={(e) => pagination.setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[16px] font-medium text-gray-900">
                ID
              </TableHead>
              <TableHead className="text-[16px] font-medium text-gray-900">
                Category
              </TableHead>
              <TableHead className="text-[16px] font-medium text-gray-900">
                Number of Book
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!loading &&
              bookCountData &&
              bookCountData.map((data, index) => {
                return (
                  <TableRow key={data.category_id}>
                    <TableCell className="font-medium text-gray-600">
                      {data.category_id}
                    </TableCell>
                    <TableCell className="font-medium text-gray-600">
                      {data.category_name}
                    </TableCell>
                    <TableCell className="font-medium text-gray-600">
                      {data.number_of_book}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
