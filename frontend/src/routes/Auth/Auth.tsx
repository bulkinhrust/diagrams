import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Button, Card, TextField } from '@UIKit';
import classes from './Auth.module.scss';
import OAuthComponent from '../../components/OAuthComponent';
import authStore from '@stores/auth/authStore';
import { getGoogleOAuthURL } from '../../utils/getGoogleOAuthURL';
import { Lock, Mail, Warning } from '@modules/icons';


const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { method } = useParams<{ method: string }>();
  const changeMethod = () => navigate(`/auth/${method === 'signin' ? 'signup' : 'signin'}`);
  
  return (
    <div className={classes.component}>
      <aside className={classes.sidebar}>
        <h1>Crafty Craft</h1>
        {method}
      </aside>

      <header className={classes.header}>
        <span>{method === 'signin' ? 'Еще нет аккаунта?' : 'Уже зарегистрировались?'}</span>
        <Button onClick={changeMethod} type="text">{method === 'signin' ? 'Зарегистрироваться' : 'Войти'}</Button>
      </header>
    
      <div className={classes.content}>
        <form className={classes.form}>
          <h1>{method === 'signin' ? 'Вход' : 'Регистрация'}</h1>
          <TextField
            placeholder="Введите email"
            name="email"
            startAdornment={<Mail />}
            type="email"
          />
          <TextField
            placeholder="Введите пароль"
            name="password"
            startAdornment={<Lock />}
            type="password"
          />
          {method !== 'signin' && (
            <TextField
              name="repassword"
              placeholder="Повторите пароль"
              startAdornment={<Lock />}
              type="password"
            />
          )}
          <div className={classes.submit}>
            <OAuthComponent />
            <Button size="small" variant="primary">Зарегистрироваться</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
