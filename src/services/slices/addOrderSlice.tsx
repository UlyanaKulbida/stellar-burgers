import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const addOrder = createAsyncThunk(
  'addOrder/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order; // Directly return the order data
  }
);

export type TAddOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TAddOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

const addOrderSlice = createSlice({
  name: 'addOrder',
  initialState,
  reducers: {
    resetOrder: () => initialState // Прямой сброс в исходное состояние
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null; // Устраните предыдущие ошибки
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Failed to create order';
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      });
  }
});

export const { resetOrder } = addOrderSlice.actions;
export const addOrderReducer = addOrderSlice.reducer;

// Селекторы
export const orderRequestSelector = (state: { addOrder: TAddOrderState }) =>
  state.addOrder.orderRequest;
export const orderModalDataSelector = (state: { addOrder: TAddOrderState }) =>
  state.addOrder.orderModalData;
export const errorSelector = (state: { addOrder: TAddOrderState }) =>
  state.addOrder.error;
