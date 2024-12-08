import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredientsStateSelector } from '../../services/slices/ingredientSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { ingredients } = useSelector(getIngredientsStateSelector);
  const { id } = useParams();
  const ingredientData = ingredients.find((i) => i._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
