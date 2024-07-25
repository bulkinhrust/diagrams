import { observer } from 'mobx-react-lite';
import React from 'react';
import userStore from '../../stores/user/userStore';
import AppRouter from '../AppRouter';
import Header from '../Header';

const App: React.FC = observer(() => {
  const { isAuth, user } = userStore;

  return (
    <div>
      <Header isAuth={isAuth} user={user} />
      <AppRouter isAuth={isAuth} />
    </div>
  )
});

export default App
