import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import authStore from '../../stores/auth/authStore';
import AppRouter from '../../routes/AppRouter';
import Header from '../Header';
import classes from './App.module.scss';
import Sidebar from '../Sidebar';

const App: React.FC = observer(() => {
  const { fetchUser, isAuth, loading, logout, user } = authStore;
  const isMounted = useRef(false);

  useEffect(() => {
    if (!user && !isMounted.current) {
      fetchUser();
      isMounted.current = true;
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <AppRouter />;
  };

  return (
    <div className={classes.component}>
      <Sidebar />
      <Header isAuth={isAuth} logout={logout} user={user} />
      <AppRouter />
    </div>
  )
});

export default App
