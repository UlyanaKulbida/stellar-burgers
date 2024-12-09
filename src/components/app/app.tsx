import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, OrderInfo, IngredientDetails, Modal } from '@components';
import { useLocation, useNavigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { Suspense, useEffect, useState } from 'react';
import { getIngredientsList } from '../../services/slices/ingredientSlice';
import {
  isAuthCheckedSelector,
  userGet
} from '../../services/slices/userSlice';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(isAuthCheckedSelector);

  useEffect(() => {
    dispatch(getIngredientsList()); // Загружаем ингредиенты всегда
    if (isAuthChecked) {
      dispatch(userGet()); // Получаем данные пользователя только если авторизован
    }
  }, [dispatch, isAuthChecked]);

  return (
    <div className={styles.app}>
      <Suspense fallback={<div>Loading...</div>}>
        <AppHeader />
        <Routes location={location.state?.background || location}>
          {/* Public Routes */}
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderInfo />} />

          {/* Protected Routes */}
          <Route
            path='/ingredients/:id'
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  Детали ингредиента
                </p>
                <IngredientDetails />
              </div>
            }
          />
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found Route */}
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {/* Modal Routes */}
        {location.state?.background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title={'Заказ'} onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title={'Детали ингредиента'}
                  onClose={() => navigate(-1)}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title={'Заказ'} onClose={() => navigate(-1)}>
                  <ProtectedRoute>
                    <OrderInfo />
                  </ProtectedRoute>
                </Modal>
              }
            />
          </Routes>
        )}
      </Suspense>
    </div>
  );
};

export default App;
