import React from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { Button } from '../../modules/UIKit';
import classes from './Header.module.scss';

type Props = {
  isAuth: boolean;
  user?: User;
};

const Header: React.FC<Props> = (props) => {
  const { isAuth, user } = props;
  const navigate = useNavigate();

  return (
    <div className={classes.component}>
      <span
        className={classes.logo}
        onClick={() => navigate('/')}
      >
        DIAGRAMS
      </span>

      {isAuth && user
        ? <span>{user.email}</span>
        : <Button onClick={() => navigate('/login')}>Войти или зарегистрироваться</Button>}
    </div>
  );
};

export default Header;
