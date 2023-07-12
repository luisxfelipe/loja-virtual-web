import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthType } from '../../modules/login/types/AuthType';
import { ProductRoutesEnum } from '../../modules/product/routes';
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

  const authRequest = async (body: unknown): Promise<void> => {
    const navigate = useNavigate();
    setLoading(true);

    await connectionAPIPost<AuthType>(URL_LOGIN, body)
      .then((result) => {
        setUser(result.user);
        setAuthorizationToken(result.access_token);
        navigate(ProductRoutesEnum.PRODUCT);
        return result;
      })
      .catch(() => {
        setNotification(ERROR_INVALID_LOGIN, 'error');
      });

    setLoading(false);
  };

  return {
    loading,
    authRequest,
    request,
  };
};
