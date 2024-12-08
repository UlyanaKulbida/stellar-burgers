import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import React, { memo } from 'react';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

const ProtectedRouteComponent = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

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

// type ProtectedRouteProps = {
//   onlyUnAuth?: boolean;
//   children: React.ReactNode;
// };

// export const ProtectedRoute = ({
//   onlyUnAuth,
//   children
// }: ProtectedRouteProps) => {
//   const isAuthChecked = useSelector(isAuthCheckedSelector);
//   const location = useLocation();

//   if (!onlyUnAuth && !isAuthChecked) {
//     return <Navigate replace to='/login' state={{ from: location }} />;
//   }

//   if (onlyUnAuth && isAuthChecked) {
//     const from = location.state?.from || { pathname: '/' };
//     return <Navigate replace to={from} />;
//   }

//   return children;
// };
