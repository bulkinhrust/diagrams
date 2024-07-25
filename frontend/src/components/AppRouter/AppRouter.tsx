import { observer } from 'mobx-react-lite';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/Main';
import userStore from '../../stores/user/userStore';

import { authRoutes, publicRoutes } from './AppRouter.routes';

type Props = {};

const AppRouter: React.FC<Props> = observer((props) => {
  const { isAuth } = userStore;

  return (
    <Routes>
      {isAuth && (
        authRoutes.map(({ path, Component }) => (
          <Route path={path} element={<Component />} />
        ))
      )}
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} />
      ))}

      <Route path="*" element={<Main />} />
    </Routes>
  );
});

export default AppRouter;
