import { CategoryType } from './CategoryType';

export interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: CategoryType;
  //weight: number;
  //length: number;
  //height: number;
  //width: number;
  //diameter: number;
}
