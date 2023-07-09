import axios from 'axios';
import { useState } from 'react';

import { connectionAPIPost } from '../functions/connection/connectionApi';
import { useGlobalContext } from './useGlobalContext';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification } = useGlobalContext();

  const getRequests = async (url: string) => {
    setLoading(true);

    const result = await axios({
      method: 'GET',
      url,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        alert('Erro');
      });

    setLoading(false);

    return result;
  };

  const postRequests = async <T>(url: string, body: unknown): Promise<T | undefined> => {
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

  return {
    loading,
    getRequests,
    postRequests,
  };
};
