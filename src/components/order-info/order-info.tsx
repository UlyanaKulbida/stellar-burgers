import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/slices/ingredientSlice';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  const { number: orderId } = useParams();
  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const data = await getOrderByNumberApi(Number(orderId));
        setOrderData(data.orders[0] || null);
      } catch (error) {
        console.error('Failed to fetch order data:', error);
      }
    };
    fetchOrderData();
  }, [orderId]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const ingredientsInfo = ingredients.reduce(
      (acc, ingredient) => {
        acc[ingredient._id] = { ...ingredient, count: 0 };
        return acc;
      },
      {} as Record<string, TIngredient & { count: number }>
    );

    orderData.ingredients.forEach((item) => {
      if (ingredientsInfo[item]) {
        ingredientsInfo[item].count += 1;
      }
    });

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date: new Date(orderData.createdAt),
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
