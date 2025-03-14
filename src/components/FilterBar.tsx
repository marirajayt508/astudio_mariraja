import React from 'react';

interface FilterBarProps {
  columns: string[];
  onFilterChange: (field: string, value: string) => void;
  activeFilters: Record<string, string>;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  columns, 
  onFilterChange, 
  activeFilters,
  pageSize,
  onPageSizeChange,
  searchTerm,
  onSearchTermChange
}) => {
  
  // Format column name for display
  const formatColumnName = (column: string): string => {
    if (column.includes('.')) {
      return column.split('.').pop() || column;
    }
    
    // Add spaces before capital letters and capitalize first letter
    return column
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="mb-6">
      {/* Entries and Search Row */}
      <div className="flex flex-wrap items-center mb-4 border-b pb-4">
        <div className="flex items-center mr-8">
          <span className="mr-2 text-gray-700">Entries</span>
          <select 
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-custom-blue"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        
        <div className="flex-1 flex justify-end">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue w-full"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Column Filters - Single Row */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        {columns.slice(0, 5).map((column) => (
          <div key={column} className="flex items-center flex-shrink-0">
            <span className="mr-2 text-gray-700 whitespace-nowrap font-medium">
              {formatColumnName(column)}
            </span>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-custom-blue w-24 sm:w-32"
              placeholder={`Filter...`}
              value={activeFilters[column] || ''}
              onChange={(e) => onFilterChange(column, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
