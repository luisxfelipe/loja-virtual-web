import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { FirstScreenRoutesEnum } from '../../modules/firstScreen/routes';
import { AuthType } from '../../modules/login/types/AuthType';
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer';
import { ERROR_INVALID_LOGIN } from '../constants/errorsStatus';
import { URL_LOGIN } from '../constants/urls';
import { setAuthorizationToken } from '../functions/connection/auth';
import ConnectionAPI, {
  connectionAPIPost,
  MethodType,
} from '../functions/connection/connectionApi';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification, setUser } = useGlobalReducer();

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
  ): Promise<T | undefined> => {
    setLoading(true);

    const result: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
      .then((response) => {
        if (saveGlobal) {
          saveGlobal(response);
        }
        return response;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
      });

    setLoading(false);

    return result;
  };

  const authRequest = async (navigate: NavigateFunction, body: unknown): Promise<void> => {
    setLoading(true);

    await connectionAPIPost<AuthType>(URL_LOGIN, body)
      .then((result) => {
        console.log(`result: ${JSON.stringify(result)}`); // result: [object Object]
        setUser(result.user);
        console.log(`result.user: ${JSON.stringify(result.user)}`); // result.user: undefined
        setAuthorizationToken(`Bearer ${result.access_token}`);
        console.log(`result.access_token: ${JSON.stringify(result.access_token)}`); // result.access_token: undefined
        navigate(FirstScreenRoutesEnum.FIRST_SCREEN);
        return result;
      })
      .catch(() => {
        setNotification(ERROR_INVALID_LOGIN, 'error');
        return undefined;
      });

    setLoading(false);
  };

  return {
    loading,
    authRequest,
    request,
  };
};
