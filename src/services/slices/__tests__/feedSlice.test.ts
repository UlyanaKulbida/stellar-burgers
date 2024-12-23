import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { feedsReducer } from '../feedSlice';

describe('feedsSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: true,
    error: null
  };

  it('обработка getFeedsList: pending', () => {
    const action = { type: 'feeds/all/pending' };
    const nextState = feedsReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('обработка getFeedsList: fulfilled', () => {
    const orders = [{ _id: '1', number: 123 } as TOrder];
    const action = {
      type: 'feeds/all/fulfilled',
      payload: { orders, total: 100, totalToday: 10 }
    };
    const nextState = feedsReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.orders).toEqual(orders);
    expect(nextState.total).toBe(100);
    expect(nextState.totalToday).toBe(10);
  });

  it('обработка getFeedsList: rejected', () => {
    const action = {
      type: 'feeds/all/rejected',
      payload: 'Error message',
      error: { message: 'Error message' }
    };
    const nextState = feedsReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Error message');
  });
});
