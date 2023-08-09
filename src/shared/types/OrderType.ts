import { UserType } from '../../modules/login/types/UserType';
import { AddressType } from './AddressType';
import { OrderProductType } from './OrderProductType';
import { PaymentType } from './PaymentType';

export interface OrderType {
  id: number;
  date: string;
  userId: number;
  user: UserType;
  quantityProducts: number;
  payment?: PaymentType;
  address: AddressType;
  orderProducts?: OrderProductType[];
}
