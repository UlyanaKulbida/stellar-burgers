import {
  getIngredientsList,
  ingredientsSliceReducer
} from '../ingredientSlice';

describe('Ingredients reducer', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('обрабатка состояния ожидания', () => {
    const action = { type: getIngredientsList.pending.type };
    const newState = ingredientsSliceReducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('оработка успешной нагрузки', () => {
    const ingredients = [{ _id: '1', name: 'Test' }];
    const action = {
      type: getIngredientsList.fulfilled.type,
      payload: ingredients
    };
    const newState = ingredientsSliceReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual(ingredients);
    expect(newState.error).toBeNull();
  });

  it('оработка сбойной нагрузки', () => {
    const error = 'Не удалось загрузить ингредиенты';
    const action = {
      type: getIngredientsList.rejected.type,
      error: { message: error }
    };
    const newState = ingredientsSliceReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
});
