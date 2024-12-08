import { getOrderByNumberApi, orderBurgerApi } from '@api';
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

// export const addOrder = createAsyncThunk(
//   'addOrder/createOrder',
//   orderBurgerApi
// );

// export type TAddOrderState = {
//   orderRequest: boolean;
//   orderModalData: TOrder | null;
//   error: string | undefined;
// };

// export const initialState: TAddOrderState = {
//   orderRequest: false,
//   orderModalData: null,
//   error: undefined
// };

// export const addOrderSlice = createSlice({
//   name: 'addOrder',
//   initialState,
//   reducers: {
//     resetOrder: (state) => (state = initialState)
//   },
//   selectors: {
//     orderRequestSelector: (state) => state.orderRequest,
//     orderModalDataSelector: (state) => state.orderModalData,
//     errorSelector: (state) => state.error
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addOrder.pending, (state) => {
//         state.orderRequest = true;
//       })
//       .addCase(addOrder.rejected, (state, action) => {
//         state.orderRequest = false;
//         state.error = action.error.message;
//       })
//       .addCase(addOrder.fulfilled, (state, action) => {
//         state.orderRequest = false;
//         state.orderModalData = action.payload.order;
//       });
//   }
// });

// export const { resetOrder } = addOrderSlice.actions;
// export const { orderRequestSelector, orderModalDataSelector, errorSelector } =
//   addOrderSlice.selectors;
// export const addOrderReducer = addOrderSlice.reducer;
