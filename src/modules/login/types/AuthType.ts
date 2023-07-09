import { UserType } from './UserType';

export interface AuthType {
  access_token: string;
  user: UserType;
}
