import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrdersList,
  getOrdersListSelector
} from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrdersListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
