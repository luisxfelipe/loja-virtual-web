import { NavigateFunction, redirect } from 'react-router-dom';

import { LoginRoutesEnum } from '../../../modules/login/routes';
import { UserTokenType } from '../../../modules/login/types/UserTokenType';
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

export const getUserInfoByToken = (): UserTokenType | undefined => {
  const token = getAuthorizationToken();
  const tokenSplited = token?.split('.');

  if (tokenSplited && tokenSplited.length > 1) {
    return JSON.parse(window.atob(tokenSplited[1]));
  }

  return undefined;
};

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();
  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN);
  }
  const user = await connectionAPIGet<UserType>(URL_USERS).catch(() => {
    unsetAuthorizationToken();
  });

  if (!user) {
    return redirect(LoginRoutesEnum.LOGIN);
  }

  return null;
};

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken();
  navigate(LoginRoutesEnum.LOGIN);
};
