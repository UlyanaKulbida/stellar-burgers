import {
  getIngredientsList,
  ingredientsSliceReducer
} from '../ingredientSlice';
import { initialState as rootInitialState } from './rootReducer.test';
import { INGREDIENT_ERROR_MESSAGE } from '../../../utils/constants.utils';

describe('Ingredients reducer', () => {
  const initialState = rootInitialState.burgerIngredients;
  const PENDING_TYPE = getIngredientsList.pending.type;
  const FULFILLED_TYPE = getIngredientsList.fulfilled.type;
  const REJECTED_TYPE = getIngredientsList.rejected.type;

  it('обрабатка состояния ожидания', () => {
    const action = { type: PENDING_TYPE };
    const newState = ingredientsSliceReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('оработка успешной нагрузки', () => {
    const ingredients = [{ _id: '1', name: 'Test' }];
    const action = {
      type: FULFILLED_TYPE,
      payload: ingredients
    };
    const newState = ingredientsSliceReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual(ingredients);
    expect(newState.error).toBeNull();
  });

  it('оработка сбойной нагрузки', () => {
    const action = {
      type: REJECTED_TYPE,
      error: { message: INGREDIENT_ERROR_MESSAGE }
    };
    const newState = ingredientsSliceReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(INGREDIENT_ERROR_MESSAGE);
  });
});
