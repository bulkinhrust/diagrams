import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from '../../pages/Main';
import { authRoutes, publicRoutes } from './AppRouter.routes';

type Props = {
  isAuth: boolean
};

const AppRouter: React.FC<Props> = (props) => {
  const { isAuth } = props;

  return (
    <Routes>
      {isAuth && (
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))
      )}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      <Route path="*" element={<Main />} />
    </Routes>
  );
};

export default AppRouter;
