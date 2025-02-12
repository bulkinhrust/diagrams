import { NonIndexRouteObject } from 'react-router';

import Auth from '../Auth';
import Dashboard from '../Dashboard';
import Dashboards from '../Dashboards';
import DemoBoard from '../DemoBoard';
import HomePage from '../HomePage';
import Pricing from '../Pricing';
import Profile from '../Profile';

interface IIndexRouteObject extends NonIndexRouteObject {
  Component: React.ComponentType;
}

// Только для авторизованных пользователей.
export const authRoutes: IIndexRouteObject[] = [
  { path: '/dashboard', Component: Dashboards },
  { path: '/dashboard/:id', Component: Dashboard },
  { path: '/profile', Component: Profile }
];

// Только для НЕ авторизованных пользователей.
export const protectedRoutes: IIndexRouteObject[] = [
  { path: '/auth', Component: Auth },
];

// Только для авторизованных пользователей.
export const publicRoutes: IIndexRouteObject[] = [
  { path: '/demo', Component: DemoBoard },
  { path: '/pricing', Component: Pricing },
  // { path: '/blog', Component: Blog },
  // { path: '/contact', Component: Contact },
  { path: '/', Component: HomePage }
];
