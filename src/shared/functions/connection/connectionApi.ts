import axios, { AxiosRequestConfig } from 'axios';

import { ERROR_ACCESS_DANIED, ERROR_CONNECTION } from '../../constants/errorsStatus';
import { MethodsEnum } from '../../enums/methods.enum';
import { getAuthorizationToken } from './auth';

export type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';

export default class ConnectionAPI {
  static async call<T>(url: string, method: MethodType, body?: unknown): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${getAuthorizationToken()}`,
        'Content-Type': 'application/json',
      },
    };

    switch (method) {
      case MethodsEnum.POST:
      case MethodsEnum.PUT:
      case MethodsEnum.PATCH:
        return (await axios[method]<T>(url, body, config)).data;
      case MethodsEnum.GET:
      case MethodsEnum.DELETE:
      default:
        return (await axios[method]<T>(url, config)).data;
    }
  }

  static async connect<T>(url: string, method: MethodType, body?: unknown): Promise<T> {
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
  return await ConnectionAPI.connect(url, MethodsEnum.GET);
};

export const connectionAPIPost = async <T>(url: string, body: unknown): Promise<T> => {
  return await ConnectionAPI.connect(url, MethodsEnum.POST, body);
};

export const connectionAPIPatch = async <T>(url: string, body: unknown): Promise<T> => {
  return await ConnectionAPI.connect(url, MethodsEnum.PATCH, body);
};

export const connectionAPIPut = async <T>(url: string, body: unknown): Promise<T> => {
  return await ConnectionAPI.connect(url, MethodsEnum.PUT, body);
};

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
  return await ConnectionAPI.connect(url, MethodsEnum.DELETE);
};
