import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | 'ellipsis';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = (): PageItem[] => {
    const pageNumbers: PageItem[] = [];
    if (totalPages <= 7) {
      // If we have 7 or fewer pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end pages to show around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis if needed before the start page
      if (startPage > 2) {
        pageNumbers.push('ellipsis');
      }
      
      // Add pages around current page
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed after the end page
      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="py-4">
      <nav className="block" aria-label="Pagination">
        <ul className="flex flex-wrap items-center justify-center gap-1">
          <li>
            <button
              className={`flex items-center justify-center px-3 py-2 border rounded-md ${
                isPrevDisabled 
                  ? 'bg-custom-grey text-custom-black opacity-50 cursor-not-allowed' 
                  : 'bg-white border-custom-blue text-custom-black hover:bg-custom-blue hover:text-custom-black transition-colors'
              }`}
              onClick={() => !isPrevDisabled && onPageChange(currentPage - 1)}
              disabled={isPrevDisabled}
              aria-label="Go to previous page"
              aria-disabled={isPrevDisabled}
            >
              Previous
            </button>
          </li>
          
          {pageNumbers.map((item, index) => {
            if (item === 'ellipsis') {
              return (
                <li key={`ellipsis-${index}`}>
                  <span className="px-3 py-2 text-custom-black" aria-hidden="true">
                    &hellip;
                  </span>
                </li>
              );
            }
            
            const isCurrentPage = currentPage === item;
            return (
              <li key={`page-${item}`}>
                <button
                  className={`px-3 py-2 border rounded-md ${
                    isCurrentPage
                      ? 'bg-custom-yellow text-custom-black border-custom-yellow'
                      : 'bg-white border-custom-blue text-custom-black hover:bg-custom-blue hover:text-custom-black transition-colors'
                  }`}
                  onClick={() => !isCurrentPage && onPageChange(item)}
                  aria-label={`Go to page ${item}`}
                  aria-current={isCurrentPage ? 'page' : undefined}
                >
                  {item}
                </button>
              </li>
            );
          })}
          
          <li>
            <button
              className={`flex items-center justify-center px-3 py-2 border rounded-md ${
                isNextDisabled 
                  ? 'bg-custom-grey text-custom-black opacity-50 cursor-not-allowed' 
                  : 'bg-white border-custom-blue text-custom-black hover:bg-custom-blue hover:text-custom-black transition-colors'
              }`}
              onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
              disabled={isNextDisabled}
              aria-label="Go to next page"
              aria-disabled={isNextDisabled}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
