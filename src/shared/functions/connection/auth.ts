import { UserType } from '../../../modules/login/types/UserType';
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { URL_USERS } from '../../constants/urls';
import { connectionAPIGet } from './connectionApi';
import { getItem, removeItem, setItem } from './storageProxy';

export const unsetAuthorizationToken = () => removeItem(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItem(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => getItem(AUTHORIZATION_KEY);

export const verifyLoggedIn = async (setUser: (user: UserType) => void, user?: UserType) => {
  const token = getAuthorizationToken();

  if (!token) {
    location.href = '/login';
  }
  if (!user) {
    await connectionAPIGet<UserType>(URL_USERS)
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        unsetAuthorizationToken();
        location.href = '/login';
      });
  }
  return null;
};
