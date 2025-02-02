import React from 'react';

import { Card, TextField } from '@UIKit';
import classes from './Auth.module.scss';

type Props = {};

const Auth: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <Card className={classes.component}>
      <form className={classes.form}>
        <TextField label="Email" placeholder="Введите email" name="email" type="email" />
        <TextField label="Пароль" placeholder="Введите пароль" name="password" type="password" />
      </form>
    </Card>
  );
};

export default Auth;
