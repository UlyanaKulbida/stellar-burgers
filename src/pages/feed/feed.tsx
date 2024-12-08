import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedsList,
  isLoadingSelector,
  ordersSelector
} from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(ordersSelector);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(getFeedsList());
  }, [dispatch]);

  const handleGetFeeds = () => {
    setIsRefreshing(true);
    dispatch(getFeedsList())
      .then(() => {
        setIsRefreshing(false);
      })
      .catch(() => {
        setIsRefreshing(false);
      });
  };

  if (isLoading || isRefreshing) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
