import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbsProps {
  currentPage: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPage }) => {
  return (
    <div className="bg-gray-100 p-4 mb-6 rounded-md">
      <div className="flex items-center text-lg">
        <Link to="/" className="text-gray-600 hover:text-custom-blue">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="font-medium text-custom-black bg-yellow-200 px-2 py-1 rounded">
          {currentPage}
        </span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
