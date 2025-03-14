import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  setPageSize,
  setSearchTerm,
  setFilter,
  clearFilters,
  setPage,
  setCategoryFilter,
} from '../redux/slices/productsSlice';
import { RootState } from '../redux/store';
import { ProductsState } from '../redux/slices/productsSlice';
import DataTable from '../components/DataTable';
import PageSizeDropdown from '../components/PageSizeDropdown';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import CategoryTabs from '../components/CategoryTabs';
import Breadcrumbs from '../components/Breadcrumbs';
import FilterBar from '../components/FilterBar';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const productsState: ProductsState = useSelector((state: RootState) => state.products as ProductsState);
  const { 
    products, 
    loading, 
    error, 
    pageSize, 
    searchTerm, 
    filter, 
    filterField, 
    total, 
    page, 
    categoryFilter 
  } = productsState;

  // State for filter inputs
  const [titleFilter, setTitleFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryInputFilter, setCategoryInputFilter] = useState('');

  useEffect(() => {
    dispatch<any>(fetchProducts());
  }, [dispatch, pageSize, page, filter, filterField, categoryFilter]);

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
      if (field === 'title') setTitleFilter(value);
      if (field === 'brand') setBrandFilter(value);
      if (field === 'category') setCategoryInputFilter(value);
      
      // Clear other filter inputs
      if (field !== 'title') setTitleFilter('');
      if (field !== 'brand') setBrandFilter('');
      if (field !== 'category') setCategoryInputFilter('');
    } else {
      dispatch(clearFilters());
      setTitleFilter('');
      setBrandFilter('');
      setCategoryInputFilter('');
    }
  };

  const handleCategoryTabChange = (category: string) => {
    dispatch(setCategoryFilter(category));
    // Clear all filter inputs when changing category tabs
    setTitleFilter('');
    setBrandFilter('');
    setCategoryInputFilter('');
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  const columns = [
    "title",
    "description",
    "price",
    "discountPercentage",
    "rating",
    "stock",
    "brand",
    "category",
    "thumbnail"
  ];

  // Apply client-side search filtering
  const filteredProducts = searchTerm
    ? products.filter(product =>
        columns.some(column => {
          const value = product[column as keyof typeof product];
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      )
    : products;

  const totalPages = Math.ceil(total / pageSize);

  // Create an object to track active filters
  const activeFilters: Record<string, string> = {};
  if (titleFilter) activeFilters['title'] = titleFilter;
  if (brandFilter) activeFilters['brand'] = brandFilter;
  if (categoryInputFilter) activeFilters['category'] = categoryInputFilter;

  return (
    <div className="container mx-auto p-4 font-neutra">
      {/* Breadcrumbs */}
      <Breadcrumbs currentPage="Products" />
      
      <h1 className="text-2xl font-bold mb-4 text-custom-black">Products</h1>
      
      {/* Category Tabs */}
      <div className="mb-6">
        <CategoryTabs
          categories={['all', 'laptops']}
          activeCategory={categoryFilter}
          onCategoryChange={handleCategoryTabChange}
        />
      </div>
      
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
          <DataTable columns={columns} data={filteredProducts} />
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

export default ProductsPage;
