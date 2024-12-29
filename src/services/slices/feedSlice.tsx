import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

export const getFeedsList = createAsyncThunk('feeds/all', getFeedsApi);

export type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TFeedsState = {
  orders: [] as TOrder[],
  total: 0,
  totalToday: 0,
  loading: true,
  error: null as string | null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    ordersSelector: (state) => state.orders,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday,
    isLoadingSelector: (state) => state.loading,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeedsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  }
});

export const {
  ordersSelector,
  totalSelector,
  totalTodaySelector,
  isLoadingSelector,
  errorSelector
} = feedsSlice.selectors;

export const feedsReducer = feedsSlice.reducer;
