import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { ordersReducer } from '../orderSlice';

describe('ordersSlice', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  it('обработка getOrdersList: pending', () => {
    const action = { type: 'orders/getOrders/pending' };
    const nextState = ordersReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.orders).toEqual([]);
    expect(nextState.error).toBeNull();
  });

  it('обработка getOrdersList: fulfilled', () => {
    const orders = [{ _id: '1', number: 123 } as TOrder];
    const action = { type: 'orders/getOrders/fulfilled', payload: orders };
    const nextState = ordersReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.orders).toEqual(orders);
  });

  it('обработка getOrdersList: rejected', () => {
    const action = {
      type: 'orders/getOrders/rejected',
      payload: 'Error message',
      error: { message: 'Error message' }
    };
    const nextState = ordersReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Error message');
  });
});
