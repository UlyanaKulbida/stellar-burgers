import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { errorSelector, userLogin } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(errorSelector);
  const location = useLocation();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      userLogin({
        email,
        password
      })
    ).then(() => {
      if (!error) {
        const from = location.state?.from || { pathname: '/' };
        navigate(from);
      }
    });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
