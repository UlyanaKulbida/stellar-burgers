import { useDispatch, useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import React, { memo, useEffect, useState } from 'react';
import {
  isAuthCheckedSelector,
  userGet
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { getCookie } from '../../utils/cookie';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

const ProtectedRouteComponent = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();
  const accessToken = getCookie('accessToken');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        try {
          await dispatch(userGet());
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [accessToken, dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};

export const ProtectedRoute = memo(ProtectedRouteComponent);
