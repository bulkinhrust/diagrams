import React, { useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Button, Card, TextField } from '@UIKit';
import classes from './Auth.module.scss';
import OAuthComponent from '../../components/OAuthComponent';
import authStore from '@stores/auth/authStore';
import { getGoogleOAuthURL } from '../../utils/getGoogleOAuthURL';


const Auth: React.FC = () => {
  const { loginWithToken } = authStore;
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');

  // const code = useMemo(() => location.hash && decodeURIComponent(location.hash.replace('#', ''))
  //   .split('&')[0]
  //   .split('=')[1],
  // []);

  // console.log((location.state as { from?: string })?.from);
  console.log('++++++++++', code);

  useEffect(() => {
    if (code) {
      loginWithToken(code);
    }
  }, []);
  
  return (
    <Card className={classes.component}>
      <form className={classes.form}>
        {/* <a href={getGoogleOAuthURL()}>AUTH</a> */}
        {/* <TextField label="Email" placeholder="Введите email" name="email" type="email" />
        <TextField label="Пароль" placeholder="Введите пароль" name="password" type="password" /> */}
        <OAuthComponent />
      </form>
    </Card>
  );
};

export default Auth;
