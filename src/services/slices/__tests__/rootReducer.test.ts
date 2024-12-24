import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorReducer } from '../constructorSlice';
import { ingredientsSliceReducer } from '../ingredientSlice';
import { userReducer } from '../userSlice';
import { feedsReducer } from '../feedSlice';
import { ordersReducer } from '../orderSlice';
import { addOrderReducer } from '../addOrderSlice';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: ingredientsSliceReducer,
  user: userReducer,
  feeds: feedsReducer,
  orders: ordersReducer,
  addOrder: addOrderReducer
});

// Определяет начальное состояние как постоянное
export const initialState = rootReducer(undefined, { type: '@@INIT' });

describe('rootReducer', () => {
  const EXPECTED_INITIAL_STATE = {
    burgerConstructor: {
      bun: null,
      ingredients: []
    },
    burgerIngredients: {
      ingredients: [],
      loading: false,
      error: null
    },
    user: {
      isAuthChecked: false,
      user: { email: '', name: '' },
      error: null
    },
    feeds: {
      orders: [],
      total: 0,
      totalToday: 0,
      loading: true,
      error: null
    },
    orders: {
      orders: [],
      loading: false,
      error: null
    },
    addOrder: {
      orderRequest: false,
      orderModalData: null,
      error: null
    }
  };

  it('объединение всех reducers', () => {
    expect(initialState).toEqual(EXPECTED_INITIAL_STATE);
  });
});
