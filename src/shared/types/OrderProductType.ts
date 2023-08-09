import { OrderType } from './OrderType';
import { ProductType } from './ProductType';

export interface OrderProductType {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  order?: OrderType;
  product?: ProductType;
}
