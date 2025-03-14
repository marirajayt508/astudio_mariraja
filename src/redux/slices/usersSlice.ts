import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUsers, searchUsers } from '../../services/api';
import { User } from '../../types';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  pageSize: number;
  searchTerm: string;
  filter: string;
  filterField: string;
  total: number;
  page: number;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  pageSize: 5,
  searchTerm: '',
  filter: '',
  filterField: '',
  total: 0,
  page: 1,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { getState }) => {
    const state = getState() as { users: UsersState };
    const { pageSize, page, filter, filterField } = state.users;
    
    // Calculate skip value for pagination
    const skip = (page - 1) * pageSize;
    
    // If filter is set, use it to filter results
    if (filter && filterField) {
      // The API doesn't support filtering by arbitrary fields directly,
      // so we'll use the search endpoint and then filter client-side
      const response = await searchUsers(filter, { limit: 100, skip: 0 });
      
      // Filter the results by the specified field
      const filteredUsers = response.users.filter((user: any) => {
        const value = filterField.includes('.')
          ? filterField.split('.').reduce((obj, key) => obj && obj[key], user)
          : user[filterField];
          
        return value && value.toString().toLowerCase().includes(filter.toLowerCase());
      });
      
      // Apply pagination to the filtered results
      const paginatedUsers = filteredUsers.slice(skip, skip + pageSize);
      
      return {
        users: paginatedUsers,
        total: filteredUsers.length
      };
    }
    
    // Otherwise, fetch all users with pagination
    const response = await getUsers({ limit: pageSize, skip });
    return response;
  }
);

const usersSlice = createSlice({
  name: 'users',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
        state.users = [];
      });
  },
});

export const { setPageSize, setSearchTerm, setFilter, clearFilters, setPage } = usersSlice.actions;

export default usersSlice.reducer;
