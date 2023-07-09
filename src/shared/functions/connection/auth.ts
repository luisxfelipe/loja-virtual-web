import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { getItem, removeItem, setItem } from './storageProxy';

export const unsetAuthorizationToken = () => removeItem(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItem(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => getItem(AUTHORIZATION_KEY);
