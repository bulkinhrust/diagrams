import { RouteObject } from 'react-router';
import Auth from '../../pages/Auth';

import Diagram from '../../pages/Diagram';
import Diagrams from '../../pages/Diagrams';
import Main from '../../pages/Main';

export const authRoutes: RouteObject[] = [
  {
    path: '/diagrams',
    Component: Diagrams,
  },
  {
    path: '/diagrams/:id',
    Component: Diagram,
  }
];

export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    Component: Auth,
  },
  {
    path: '/registration',
    Component: Auth,
  },
  {
    path: '/',
    Component: Main,
  }
];
