import { ordersReducer } from '../orderSlice';
import { initialState as rootInitialState } from './rootReducer.test';
import { getActionTypes, ERROR_MESSAGE } from '../../../utils/constants.utils';

describe('ordersSlice', () => {
  const initialState = rootInitialState.orders;
  const { PENDING, FULFILLED, REJECTED } = getActionTypes('orders/getOrders');

  it('обработка getOrdersList: pending', () => {
    const action = { type: PENDING };
    const nextState = ordersReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.orders).toEqual([]);
    expect(nextState.error).toBeNull();
  });

  it('обработка getOrdersList: fulfilled', () => {
    const orders = [{ _id: '1', number: 123 }];
    const action = { type: FULFILLED, payload: orders };
    const nextState = ordersReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.orders).toEqual(orders);
  });

  it('обработка getOrdersList: rejected', () => {
    const action = {
      type: REJECTED,
      payload: ERROR_MESSAGE,
      error: { message: ERROR_MESSAGE }
    };
    const nextState = ordersReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(ERROR_MESSAGE);
  });
});
