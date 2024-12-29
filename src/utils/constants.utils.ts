export const ERROR_MESSAGE = 'Error message';
export const INGREDIENT_ERROR_MESSAGE = 'Не удалось загрузить ингредиенты';

export const getActionTypes = (actionName: string) => ({
  PENDING: `${actionName}/pending`,
  FULFILLED: `${actionName}/fulfilled`,
  REJECTED: `${actionName}/rejected`
});
