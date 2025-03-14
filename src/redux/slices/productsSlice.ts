import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProducts, getProductsByCategory, searchProducts } from '../../services/api';
import { Product } from '../../types';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  pageSize: number;
  searchTerm: string;
  filter: string;
  filterField: string;
  total: number;
  page: number;
  categoryFilter: string;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  pageSize: 5,
  searchTerm: '',
  filter: '',
  filterField: '',
  total: 0,
  page: 1,
  categoryFilter: 'all',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState }) => {
    const state = getState() as { products: ProductsState };
    const { pageSize, page, categoryFilter, filter, filterField } = state.products;
    
    // Calculate skip value for pagination
    const skip = (page - 1) * pageSize;
    
    // If category filter is set (and not 'all'), fetch products by category
    if (categoryFilter && categoryFilter !== 'all') {
      const response = await getProductsByCategory(categoryFilter, { 
        limit: pageSize, 
        skip 
      });
      return response;
    }
    
    // If other filter is set, use it to filter results
    if (filter && filterField) {
      // The API doesn't support filtering by arbitrary fields directly,
      // so we'll use the search endpoint and then filter client-side
      const response = await searchProducts(filter, { limit: 100, skip: 0 });
      
      // Filter the results by the specified field
      const filteredProducts = response.products.filter((product: any) => {
        const value = product[filterField];
        return value && value.toString().toLowerCase().includes(filter.toLowerCase());
      });
      
      // Apply pagination to the filtered results
      const paginatedProducts = filteredProducts.slice(skip, skip + pageSize);
      
      return {
        products: paginatedProducts,
        total: filteredProducts.length
      };
    }
    
    // Otherwise, fetch all products with pagination
    const response = await getProducts({ limit: pageSize, skip });
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action: PayloadAction<{ field: string; value: string }>) => {
      // Reset other filters when setting a new one
      if (state.filterField !== action.payload.field) {
        state.filter = '';
        state.filterField = '';
      }
      
      state.filter = action.payload.value;
      state.filterField = action.payload.field;
      state.page = 1;
    },
    clearFilters: (state) => {
      state.filter = '';
      state.filterField = '';
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      // Reset other filters when changing category
      state.filter = '';
      state.filterField = '';
      
      state.categoryFilter = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
        state.products = [];
      });
  },
});

export const { 
  setPageSize, 
  setSearchTerm, 
  setFilter, 
  clearFilters, 
  setPage, 
  setCategoryFilter 
} = productsSlice.actions;

export default productsSlice.reducer;
