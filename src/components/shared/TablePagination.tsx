"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalPage: number;
}

const TablePagination = ({ currentPage, totalPage }: TablePaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  if (totalPage <= 1) {
    return null;
  }
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage <= 1 || isPending}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPage) }, (_, index) => {
          let pageNumber;

          if (totalPage <= 5) {
            pageNumber = index + 1;
          } else if (currentPage <= 3) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPage - 2) {
            pageNumber = totalPage - 4 + index;
          } else {
            pageNumber = currentPage - 2 + index;
          }
          return (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => navigateToPage(pageNumber)}
              disabled={isPending}
              className="w-10"
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage === totalPage || isPending}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>

      <span className="text-sm text-muted-foreground ml-2">
        {/* Page 9 of 20 */}
        Page {currentPage} of {totalPage}
      </span>
    </div>
  );
};

export default TablePagination;
