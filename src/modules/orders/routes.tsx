import { RouteObject } from 'react-router-dom';

import Order from './';
import OrderDetail from './screens/OrderDetail';

export enum OrderRoutesEnum {
  ORDER = '/order',
  ORDER_ID = '/order/:orderId',
}

export const orderScreens: RouteObject[] = [
  {
    path: OrderRoutesEnum.ORDER,
    element: <Order />,
  },
  {
    path: OrderRoutesEnum.ORDER_ID,
    element: <OrderDetail />,
  },
];
