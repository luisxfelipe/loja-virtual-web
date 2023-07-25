import { useDispatch } from 'react-redux';

import { OrderType } from '../../../shared/types/OrderType';
import { useAppSelector } from '../../hooks';
import { setOrdersAction } from './';

export const useOrderReducer = () => {
  const dispath = useDispatch();
  const { orders } = useAppSelector((state) => state.orderReducer);

  const setOrders = (orders: OrderType[]) => {
    dispath(setOrdersAction(orders));
  };

  return {
    orders,
    setOrders,
  };
};
