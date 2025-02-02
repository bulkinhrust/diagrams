import { NonIndexRouteObject } from 'react-router';

import Auth from '../../pages/Auth';
import Diagram from '../../pages/Diagram';
import Diagrams from '../../pages/Diagrams';
import Main from '../../pages/Main';

interface IIndexRouteObject extends NonIndexRouteObject {
  Component: React.ComponentType;
}

export const authRoutes: IIndexRouteObject[] = [
  {
    path: '/diagrams',
    Component: Diagrams,
  },
  {
    path: '/diagrams/:id',
    Component: Diagram,
  }
];

export const publicRoutes: IIndexRouteObject[] = [
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
