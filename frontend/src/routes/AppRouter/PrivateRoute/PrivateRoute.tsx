import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import authStore from '@stores/auth/authStore';

const PrivateRoute: React.FC = observer(() => {
  const { isAuth } = authStore;
  const location = useLocation();
  return isAuth ? <Outlet /> : <Navigate to="/auth" state={{ from: location.pathname }} replace />;
});

export default PrivateRoute;