import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { Button, ButtonProps } from '../../modules/UIKit';
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
    navigate('/');
  };

  const goTo = (to: string) => () => navigate(to);

  const NavButton = ({ to, ...btnProps }: { to: string } & ButtonProps) => (
    <Button
      onClick={goTo(to)}
      variant={pathname === to ? 'primary' : 'base'}
      {...btnProps}
    />
  );

  return (
    <div className={classes.component}>
        {/* <NavButton to="/">Главная</NavButton>
        <NavButton to="/dashboard" disabled>Доски</NavButton>
        <NavButton to="/demo" size="small">Демо</NavButton>
        <NavButton to="/pricing">Тарифы</NavButton> */}
        

        {isAuth && user
          ? (<>
            <NavButton to="/profile">{user.name ?? user.email}</NavButton>
            <Button onClick={handleLogout}>Выйти</Button>
          </>)
          : <NavButton to="/auth">Войти</NavButton>}
    </div>
  );
};

export default Header;
