import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { Button } from '../../modules/UIKit';
import classes from './Header.module.scss';

type Props = {
  isAuth: boolean;
  logout(): void;
  user?: User;
};

const Header: React.FC<Props> = (props) => {
  const { isAuth, logout, user } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
  };

  const goTo = (to: string) => () => navigate(to);

  const NavButton = ({ label, to }: { label: string;  to: string }) => (
    <Button onClick={goTo(to)} variant={pathname === to ? 'primary' : 'base'}>{label}</Button>
  );

  return (
    <div className={classes.component}>
      <span
        className={classes.logo}
        onClick={() => navigate('/')}
      >
        DIAGRAMS
      </span>

      <div className={classes.toolbar}>
        <NavButton label="Главная" to="/" />
        <NavButton label="Доски" to="/dashboard" />
        <NavButton label="Демо" to="/demo" />
        <NavButton label="Тарифы" to="/pricing" />
        

        {isAuth && user
          ? (<>
            <NavButton label={user.name ?? user.email} to="/profile" />
            <Button onClick={handleLogout}>Выйти</Button>
          </>)
          : <NavButton label="Войти или зарегистрироваться" to="/auth" />}
      </div>
        
    </div>
  );
};

export default Header;
