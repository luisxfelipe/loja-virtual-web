import { RouteObject } from 'react-router-dom';

import User from './';
import UserInsert from './screens/userInsert';

export enum UserRoutesEnum {
  USER = '/user',
  USER_INSERT = '/user/insert',
}

export const userScreens: RouteObject[] = [
  {
    path: UserRoutesEnum.USER,
    element: <User />,
  },
  {
    path: UserRoutesEnum.USER_INSERT,
    element: <UserInsert />,
  },
];
