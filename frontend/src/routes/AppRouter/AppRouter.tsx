import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from '../NotFound';
import { authRoutes, protectedRoutes, publicRoutes } from './AppRouter.routes';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';

const AppRouter: React.FC = () => (
  <Routes>
    <Route element={<PrivateRoute />}>
      {authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Route>

    <Route element={<ProtectedRoute />}>
      {protectedRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Route>

    {publicRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;
