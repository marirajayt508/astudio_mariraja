import React from 'react';
import { User, Product } from '../types';

interface DataTableProps {
  data: User[] | Product[];
  columns: string[];
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-custom-black">No data available.</div>;
  }

  // Function to get nested property values
  const getNestedValue = (obj: any, path: string) => {
    const keys = path.split('.');
    let value = obj;
    
    for (const key of keys) {
      if (value === null || value === undefined || typeof value !== 'object') {
        return null;
      }
      value = value[key];
    }
    
    return value;
  };

  // Format value for display
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) {
      return 'N/A';
    }
    
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    return value.toString();
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-custom-grey">
        <thead className="bg-custom-blue">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-6 py-3 text-left text-sm font-medium text-custom-black uppercase tracking-wider"
              >
                {column.includes('.') ? column.split('.').pop() : column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-custom-grey">
          {data.map((row: any, rowIndex) => (
            <tr 
              key={row.id} 
              className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-custom-grey bg-opacity-20'}
            >
              {columns.map((column) => {
                const value = column.includes('.') 
                  ? getNestedValue(row, column) 
                  : row[column];
                
                return (
                  <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-custom-black">
                    {formatValue(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
