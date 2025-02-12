import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import authStore from '@stores/auth/authStore';

const ProtectedRoute: React.FC = observer(() => {
  const { isAuth } = authStore;
  return isAuth ? <Navigate to="/dashboard" /> : <Outlet />;
});

export default ProtectedRoute;