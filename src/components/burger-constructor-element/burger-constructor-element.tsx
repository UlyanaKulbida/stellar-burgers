import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  TBurgerConstructorState
} from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index }) => {
    const dispatch = useDispatch();
    const { ingredients, bun } = useSelector(
      (state: { burgerConstructor: TBurgerConstructorState }) =>
        state.burgerConstructor
    );

    const handleMoveDown = () => {
      if (index < ingredients.length - 1) {
        dispatch(moveIngredientDown(index));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveIngredientUp(index));
      }
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={ingredients.length}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
