import { feedsReducer } from '../feedSlice';
import { initialState as rootInitialState } from './rootReducer.test';
import { getActionTypes, ERROR_MESSAGE } from '../../../utils/constants.utils';

describe('feedsSlice', () => {
  const initialState = rootInitialState.feeds;
  const { PENDING, FULFILLED, REJECTED } = getActionTypes('feeds/all');

  it('обработка getFeedsList: pending', () => {
    const action = { type: PENDING };
    const nextState = feedsReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('обработка getFeedsList: fulfilled', () => {
    const orders = [{ _id: '1', number: 123 }];
    const action = {
      type: FULFILLED,
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
      type: REJECTED,
      payload: ERROR_MESSAGE,
      error: { message: ERROR_MESSAGE }
    };
    const nextState = feedsReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(ERROR_MESSAGE);
  });
});
