import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '../../utils/burger-api';

export type TOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

export const getOrdersList = createAsyncThunk('orders/getOrders', getOrdersApi);

export const initialState: TOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersList.pending, (state) => {
        state.loading = true;
        state.orders = [];
        state.error = null; // Устраните предыдущие ошибки
      })
      .addCase(getOrdersList.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      });
  }
});

export const ordersReducer = ordersSlice.reducer;

// Селекторы
export const getOrdersListSelector = (state: { orders: TOrdersState }) =>
  state.orders.orders;
export const loadingSelector = (state: { orders: TOrdersState }) =>
  state.orders.loading;
export const errorOrdersSelector = (state: { orders: TOrdersState }) =>
  state.orders.error;

// export type TOrdersState = {
//   orders: Array<TOrder>;
//   loading: boolean;
// };

// export const getOrdersList = createAsyncThunk('orders/getOrders', getOrdersApi);

// export const initialState: TOrdersState = {
//   orders: [] as TOrder[],
//   loading: false
// };

// export const ordersSlice = createSlice({
//   name: 'orders',
//   initialState,
//   reducers: {},
//   selectors: {
//     getOrdersListSelector: (state) => state.orders
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getOrdersList.pending, (state) => {
//         state.loading = true;
//         state.orders = [];
//       })
//       .addCase(getOrdersList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(getOrdersList.rejected, (state) => {
//         state.loading = false;
//       });
//   }
// });

// export const { getOrdersListSelector } = ordersSlice.selectors;
// export const ordersReducer = ordersSlice.reducer;
