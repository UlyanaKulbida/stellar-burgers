import { RootState } from 'src/services/store';
import { addOrder, addOrderReducer, resetOrder } from '../addOrderSlice';
import { TOrder } from '@utils-types';

describe('constructorSlice', () => {
  const initialState: RootState['addOrder'] = {
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  it('возвращение в исходное состояние', () => {
    expect(addOrderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('обработка addOrder: pending', () => {
    const state = addOrderReducer(initialState, {
      type: addOrder.pending.type
    });
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBe(null);
  });

  it('обработка addOrder: rejected', () => {
    const error = 'Error message';
    const state = addOrderReducer(initialState, {
      type: addOrder.rejected.type,
      error: { message: error }
    });
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(error);
  });
  it('обработка addOrder: fulfilled', () => {
    const order: TOrder = {
      _id: '123',
      number: 123,
      status: 'done',
      name: 'Номер заказа',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      ingredients: []
    };
    const state = addOrderReducer(initialState, {
      type: addOrder.fulfilled.type,
      payload: order
    });
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(order);
  });

  it('обработка resetOrder', () => {
    const order: TOrder = {
      _id: '123',
      number: 123,
      status: 'done',
      name: 'Order name',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      ingredients: []
    };
    const state = addOrderReducer(
      { ...initialState, orderModalData: order },
      resetOrder()
    );
    expect(state).toEqual(initialState);
  });
});
