import { RouteObject } from 'react-router-dom';

import User from './';

export enum UserRoutesEnum {
  USER = '/user',
}

export const userScreens: RouteObject[] = [
  {
    path: UserRoutesEnum.USER,
    element: <User />,
  },
];
