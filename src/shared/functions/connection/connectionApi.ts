import axios from 'axios';

import { ERROR_ACCESS_DANIED, ERROR_CONNECTION } from '../../constants/errorsStatus';
import { MethodsEnum } from '../../enums/methods.enum';

export default class connectionApi {
  static async call<T>(url: string, method: string, body?: unknown): Promise<T> {
    switch (method) {
      case MethodsEnum.GET:
        return (await axios.get<T>(url)).data;
      case MethodsEnum.POST:
        return (await axios.post<T>(url, body)).data;
      case MethodsEnum.PUT:
        return (await axios.put<T>(url, body)).data;
      case MethodsEnum.DELETE:
        return (await axios.delete<T>(url)).data;
      default:
        return (await axios.patch<T>(url, body)).data;
    }
  }

  static async connect<T>(url: string, method: string, body?: unknown): Promise<T> {
    return await this.call<T>(url, method, body).catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 403:
            throw new Error(ERROR_ACCESS_DANIED);
          default:
            throw new Error(ERROR_CONNECTION);
        }
      }
      throw new Error(ERROR_CONNECTION);
    });
  }
}

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
  return await connectionApi.connect(url, MethodsEnum.GET);
};

export const connectionAPIPost = async <T>(url: string, body: unknown): Promise<T> => {
  return await connectionApi.connect(url, MethodsEnum.POST, body);
};

export const connectionAPIPatch = async <T>(url: string, body: unknown): Promise<T> => {
  return await connectionApi.connect(url, MethodsEnum.PATCH, body);
};

export const connectionAPIPut = async <T>(url: string, body: unknown): Promise<T> => {
  return await connectionApi.connect(url, MethodsEnum.PUT, body);
};

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
  return await connectionApi.connect(url, MethodsEnum.DELETE);
};
