import { RootState } from 'src/services/store';
import { addOrder, addOrderReducer, resetOrder } from '../addOrderSlice';
import { TOrder } from '@utils-types';
import { initialState as rootInitialState } from './rootReducer.test';
import { ERROR_MESSAGE } from '../../../utils/constants.utils';

describe('constructorSlice', () => {
  const initialState: RootState['addOrder'] = rootInitialState.addOrder;
  const PENDING_TYPE = addOrder.pending.type;
  const FULFILLED_TYPE = addOrder.fulfilled.type;
  const REJECTED_TYPE = addOrder.rejected.type;
  const RESET_ORDER_TYPE = resetOrder.type;
  const ORDER: TOrder = {
    _id: '123',
    number: 123,
    status: 'done',
    name: 'Номер заказа',
    createdAt: '2022-01-01T00:00:00.000Z',
    updatedAt: '2022-01-01T00:00:00.000Z',
    ingredients: []
  };

  const MODIFIED_STATE = { ...initialState, orderModalData: ORDER };

  it('возвращение в исходное состояние', () => {
    expect(addOrderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('обработка addOrder: pending', () => {
    const state = addOrderReducer(initialState, {
      type: PENDING_TYPE
    });
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBe(null);
  });

  it('обработка addOrder: rejected', () => {
    const state = addOrderReducer(initialState, {
      type: REJECTED_TYPE,
      error: { message: ERROR_MESSAGE }
    });
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(ERROR_MESSAGE);
  });

  it('обработка addOrder: fulfilled', () => {
    const state = addOrderReducer(initialState, {
      type: FULFILLED_TYPE,
      payload: ORDER
    });
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(ORDER);
  });

  it('обработка resetOrder', () => {
    const state = addOrderReducer(MODIFIED_STATE, { type: RESET_ORDER_TYPE });
    expect(state).toEqual(initialState);
  });
});
