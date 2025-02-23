import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Lock, Mail, Warning } from '@icons';
import authStore from '@stores/auth/authStore';
import { Button, Form, TextField, Typography } from '@UIKit';
import OAuthComponent from '../../components/OAuthComponent';
import classes from './Auth.module.scss';
import getValidationSchema from './Auth.validate';


const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { method } = useParams<{ method: string }>();
  const { register, login } = authStore;
  const ref = useRef<HTMLFormElement>(null);
  const initValues = { email: '', password: '', confirmPassword: '' };
  const isSignin = method === 'signin';
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validationSchema = useMemo(() => getValidationSchema(!isSignin), [method]);

  const changeMethod = () => {
    setError('');
    ref.current?.reset();
    navigate(`/auth/${isSignin ? 'signup' : 'signin'}`);
  };

  const onSubmit = async (values: typeof initValues | null) => {
    if (values) {
      const authFunction = isSignin ? login : register;
      const response = await authFunction({ email: values.email, password: values.password });
      if (typeof response === 'string') {
        setError(response);
      } else if (response) {
        setError('');
        if (isSignin) {
          navigate('/dashboard');
        } else {
          changeMethod();
          setSuccess('Вы успешно зарегистрировались! Войдите под своим email и паролем');
        }
      }
    }
  };
  
  return (
    <div className={classes.component}>
      <aside className={classes.sidebar}>
        <h1>Crafty Craft</h1>
        {method}
      </aside>

      <header className={classes.header}>
        <span>{isSignin ? 'Еще нет аккаунта?' : 'Уже зарегистрировались?'}</span>
        <Button onClick={changeMethod} type="text">{isSignin ? 'Зарегистрироваться' : 'Войти'}</Button>
      </header>
    
      <div className={classes.content}>
        <Form
          className={classes.form}
          initValues={initValues}
          onSubmit={onSubmit}
          ref={ref}
          validationSchema={validationSchema}
        >
          <h1>{isSignin ? 'Вход' : 'Регистрация'}</h1>
          {!!error && <Typography size="small" type="error">{error}</Typography>}
          {!!success && <Typography size="small" type="success">{success}</Typography>}
          <TextField
            autocomplete="email"
            name="email"
            placeholder="Введите email"
            startAdornment={<Mail />}
            type="email"
          />
          <TextField
            name="password"
            placeholder="Введите пароль"
            startAdornment={<Lock />}
            type="password"
          />
          {!isSignin && (
            <TextField
              name="confirmPassword"
              placeholder="Повторите пароль"
              startAdornment={<Lock />}
              type="password"
            />
          )}
          <div className={classes.submit}>
            <OAuthComponent />
            <Button size="small" variant="primary">{isSignin ? 'Войти' : 'Зарегистрироваться'}</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
