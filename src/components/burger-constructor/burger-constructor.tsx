import { FC, useCallback, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';
import {
  addOrder,
  orderModalDataSelector,
  orderRequestSelector,
  resetOrder
} from '../../services/slices/addOrderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получение данных из store
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const isAuth = useSelector(isAuthCheckedSelector);
  const orderRequest = useSelector(orderRequestSelector);
  const orderModalData = useSelector(orderModalDataSelector);

  // Мемоизированный расчет цены
  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, ingredient: TConstructorIngredient) =>
        sum + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  // Мемоизированные данные конструктора
  const constructorItems = useMemo(
    () => ({
      bun,
      ingredients
    }),
    [bun, ingredients]
  );

  // Обработчик оформления заказа
  const onOrderClick = useCallback(() => {
    if (!isAuth) {
      return navigate('/login');
    }
    if (!bun || orderRequest) return;

    const orderIngredients = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id // Добавляем булку дважды (верх и низ)
    ];

    dispatch(addOrder(orderIngredients));
  }, [isAuth, navigate, bun, orderRequest, ingredients, dispatch]);

  // Обработчик закрытия модального окна
  const closeOrderModal = useCallback(() => {
    dispatch(resetOrder());
    dispatch(clearConstructor());
    navigate('/', { replace: true });
  }, [dispatch, navigate]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
