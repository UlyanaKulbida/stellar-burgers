import { addOrderReducer } from '../addOrderSlice';

describe('addOrderSlice', () => {
  const initialState = {
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  it('обработка заказа на добавление: pending', () => {
    const action = { type: 'addOrder/createOrder/pending' };
    const nextState = addOrderReducer(initialState, action);
    expect(nextState.orderRequest).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('обработка заказа на добавление: rejected', () => {
    const action = {
      type: 'addOrder/createOrder/rejected',
      payload: 'Error message',
      error: { message: 'Error message' }
    };
    const nextState = addOrderReducer(initialState, action);
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.error).toBe('Error message');
  });

  const action = {
    type: 'addOrder/createOrder/fulfilled',
    payload: { order: 'testOrder' }
  };
  const nextState = addOrderReducer(initialState, action);
  expect(nextState).toEqual({
    ...initialState,
    orderRequest: false,
    orderModalData: { order: 'testOrder' }
  });
});
