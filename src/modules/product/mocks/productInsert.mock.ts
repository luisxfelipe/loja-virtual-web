import { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';

export const mockProductInsert: InsertProduct = {
  name: 'Product Name',
  image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  price: 100,
  categoryId: 1,
  weight: 100,
  length: 30,
  width: 30,
  height: 30,
  diameter: 30,
};
