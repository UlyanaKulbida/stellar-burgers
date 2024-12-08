import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerConstructorReducer } from './slices/constructorSlice';
import { ingredientsSliceReducer } from './slices/ingredientSlice';
import { userReducer } from './slices/userSlice';
import { feedsReducer } from './slices/feedSlice';
import { ordersReducer } from './slices/orderSlice';
import { addOrderReducer } from './slices/addOrderSlice';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: ingredientsSliceReducer,
  user: userReducer,
  feeds: feedsReducer,
  orders: ordersReducer,
  addOrder: addOrderReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
