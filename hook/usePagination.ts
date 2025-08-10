import { useState, useMemo } from 'react';

export function usePagination() {
    // Define available page sizes
    const page_sizes = [10, 20, 30, 40, 50];

    // State for current page, initialized to 1
    const [page, setPage] = useState(1);
    const [search,setSearch] = useState('')
    // State for total count of items, initialized to 0
    const [totalCount, setTotalCount] = useState(0);
    // State for the number of items per page, initialized to 2
    const [pageSize, setPageSize] = useState(page_sizes[0] || 10); // Default to the first page size or 10

    // Calculate total pages dynamically
    const totalPages = useMemo(() => {
        if (pageSize === 0) return 0; // Avoid division by zero
        return Math.ceil(totalCount / pageSize);
    }, [totalCount, pageSize]);

    // Handles moving to the next page
    const handleNextPage = () => {
        // Only proceed if the current page is less than the total number of pages
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    };

    // Handles moving to the previous page
    const handlePrevPage = () => {
        // Only proceed if the current page is greater than 1
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return {
        page,
        totalCount,
        setPage,
        setTotalCount,
        handleNextPage,
        handlePrevPage,
        page_sizes,
        pageSize, // Renamed to pageSize for consistency
        setPageSize,
        totalPages, // Expose totalPages for convenience
        search,
        setSearch
    };
}