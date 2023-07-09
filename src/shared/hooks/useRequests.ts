import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthType } from '../../modules/login/types/AuthType';
import { ProductRoutesEnum } from '../../modules/product/routes';
import { ERROR_INVALID_LOGIN } from '../constants/errorsStatus';
import { URL_LOGIN } from '../constants/urls';
import { setAuthorizationToken } from '../functions/connection/auth';
import { connectionAPIPost } from '../functions/connection/connectionApi';
import { useGlobalContext } from './useGlobalContext';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setNotification, setUser } = useGlobalContext();

  const getRequest = async (url: string) => {
    setLoading(true);

    const result = await axios({
      method: 'GET',
      url,
    })
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        alert('Erro');
      });

    setLoading(false);

    return result;
  };

  const postRequest = async <T>(url: string, body: unknown): Promise<T | undefined> => {
    setLoading(true);

    const response = await connectionAPIPost<T>(url, body)
      .then((result) => {
        setNotification('Requisição realizada com sucesso', 'success');
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
      });

    setLoading(false);
    return response;
  };

  const authRequest = async (body: unknown): Promise<void> => {
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
    getRequest,
    postRequest,
  };
};
