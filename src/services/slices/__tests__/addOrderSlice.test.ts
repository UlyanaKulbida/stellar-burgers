import { addOrder, addOrderReducer, resetOrder } from '../addOrderSlice';
import { initialState as rootInitialState } from './rootReducer.test';
import { ERROR_MESSAGE } from '../../../utils/constants.utils';

describe('addOrderSlice', () => {
  const initialState = rootInitialState.addOrder;
  const PENDING_TYPE = addOrder.pending.type;
  const FULFILLED_TYPE = addOrder.fulfilled.type;
  const REJECTED_TYPE = addOrder.rejected.type;
  const RESET_ORDER_TYPE = resetOrder.type;
  const ORDER = {
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
    const action = { type: PENDING_TYPE };
    const nextState = addOrderReducer(initialState, action);
    expect(nextState.orderRequest).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('обработка addOrder: rejected', () => {
    const action = {
      type: REJECTED_TYPE,
      error: { message: ERROR_MESSAGE }
    };
    const nextState = addOrderReducer(initialState, action);
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.error).toBe(ERROR_MESSAGE);
  });

  it('обработка addOrder: fulfilled', () => {
    const action = {
      type: FULFILLED_TYPE,
      payload: ORDER
    };
    const nextState = addOrderReducer(initialState, action);
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.orderModalData).toEqual(ORDER);
  });

  it('обработка resetOrder', () => {
    const action = { type: RESET_ORDER_TYPE };
    const nextState = addOrderReducer(MODIFIED_STATE, action);
    expect(nextState).toEqual(initialState);
  });
});
