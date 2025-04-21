import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const start = Math.max(1, currentPage - 2);
const end = Math.min(totalPages, currentPage + 2);
return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:text-gray-500"
          }`}
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Previous
        </button>

        <div className="hidden md:flex space-x-2 mx-4">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:text-gray-500"
          }`}
        >
          Next
          <ArrowRightIcon className="h-5 w-5 ml-2" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;