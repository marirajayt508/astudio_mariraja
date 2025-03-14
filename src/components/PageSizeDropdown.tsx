import React from 'react';

interface PageSizeDropdownProps {
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
}

const PageSizeDropdown: React.FC<PageSizeDropdownProps> = ({ pageSize, onPageSizeChange }) => {
  const pageSizeOptions = [5, 10, 20, 50];

  return (
    <div className="flex items-center">
      <label htmlFor="page-size" className="mr-2 text-custom-black font-medium">Page Size:</label>
      <div className="inline-block relative w-24">
        <select
          id="page-size"
          className="block appearance-none w-full bg-white border border-custom-blue hover:border-custom-yellow px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-custom-blue"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-custom-black">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PageSizeDropdown;
