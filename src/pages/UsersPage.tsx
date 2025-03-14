import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  setPageSize,
  setSearchTerm,
  setFilter,
  clearFilters,
  setPage,
} from '../redux/slices/usersSlice';
import { RootState } from '../redux/store';
import { UsersState } from '../redux/slices/usersSlice';
import DataTable from '../components/DataTable';
import PageSizeDropdown from '../components/PageSizeDropdown';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import Breadcrumbs from '../components/Breadcrumbs';
import FilterBar from '../components/FilterBar';

const UsersPage: React.FC = () => {
  const dispatch = useDispatch();
  const usersState: UsersState = useSelector((state: RootState) => state.users as UsersState);
  const { users, loading, error, pageSize, searchTerm, filter, filterField, total, page } = usersState;

  // State for filter inputs
  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');

  useEffect(() => {
    dispatch<any>(fetchUsers());
  }, [dispatch, pageSize, page, filter, filterField]);

  const handlePageSizeChange = (size: number) => {
    dispatch(setPageSize(size));
  };

  const handleSearchTermChange = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  const handleFilterChange = (field: string, value: string) => {
    if (value) {
      dispatch(setFilter({ field, value }));
      
      // Update the corresponding filter input state
      if (field === 'firstName') setFirstNameFilter(value);
      if (field === 'lastName') setLastNameFilter(value);
      if (field === 'email') setEmailFilter(value);
      
      // Clear other filter inputs
      if (field !== 'firstName') setFirstNameFilter('');
      if (field !== 'lastName') setLastNameFilter('');
      if (field !== 'email') setEmailFilter('');
    } else {
      dispatch(clearFilters());
      setFirstNameFilter('');
      setLastNameFilter('');
      setEmailFilter('');
    }
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  const columns = [
    "firstName",
    "lastName",
    "maidenName",
    "age",
    "gender",
    "email",
    "username",
    "bloodGroup",
    "eyeColor",
    "address.city",
    "company.name",
    "phone"
  ];

  // Apply client-side search filtering
  const filteredUsers = searchTerm
    ? users.filter(user =>
        columns.some(column => {
          const value = column.includes('.')
            ? column.split('.').reduce((obj, key) => obj && obj[key], user)
            : user[column as keyof typeof user];
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      )
    : users;

  const totalPages = Math.ceil(total / pageSize);

  // Create an object to track active filters
  const activeFilters: Record<string, string> = {};
  if (firstNameFilter) activeFilters['firstName'] = firstNameFilter;
  if (lastNameFilter) activeFilters['lastName'] = lastNameFilter;
  if (emailFilter) activeFilters['email'] = emailFilter;

  return (
    <div className="container mx-auto p-4 font-neutra">
      {/* Breadcrumbs */}
      <Breadcrumbs currentPage="Users" />
      
      <h1 className="text-2xl font-bold mb-4 text-custom-black">Users</h1>
      
      {/* New FilterBar component */}
      <FilterBar 
        columns={columns.slice(0, 5)} 
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
      />

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-custom-black"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      
      {/* Data Table and Pagination */}
      {!loading && !error && (
        <>
          <DataTable columns={columns} data={filteredUsers} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default UsersPage;
