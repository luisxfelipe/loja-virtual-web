import { CityType } from './CityType';

export interface AddressType {
  id: number;
  complement: string;
  number: number;
  cep: string;
  city?: CityType;
}
