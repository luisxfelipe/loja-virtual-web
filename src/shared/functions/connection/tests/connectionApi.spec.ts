import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ERROR_ACCESS_DANIED, ERROR_CONNECTION } from '../../../constants/errorsStatus';
import { URL_LOGIN } from '../../../constants/urls';
import { MethodsEnum } from '../../../enums/methods.enum';
import ConnectionAPI, {
  connectionAPIDelete,
  connectionAPIGet,
  connectionAPIPatch,
  connectionAPIPost,
  connectionAPIPut,
} from '../connectionApi';

const mockAxios = new MockAdapter(axios);

const RETURN_VALUE = 'RETURN_VALUE';
const mockToken = 'TOKEN_MOCK';
const BODY_MOCK = { name: 'BODY_MOCK' };

jest.mock('../auth', () => ({
  getAuthorizationToken: () => mockToken,
}));

describe('connectionApi', () => {
  describe('connectionAPIGet', () => {
    it('should call axios.get', async () => {
      const mockAxiosGet = jest.spyOn(axios, 'get');

      mockAxios.onGet(URL_LOGIN).reply(200, RETURN_VALUE);

      const result = await connectionAPIGet(URL_LOGIN);

      expect(result).toEqual(RETURN_VALUE);
      expect(mockAxiosGet.mock.calls[0][0]).toEqual(URL_LOGIN);
    });
  });

  describe('connectionAPIPost', () => {
    it('should call axios.post', async () => {
      const mockAxiosPost = jest.spyOn(axios, 'post');

      mockAxios.onPost(URL_LOGIN).reply(200, RETURN_VALUE);

      const result = await connectionAPIPost(URL_LOGIN, BODY_MOCK);

      expect(result).toEqual(RETURN_VALUE);
      expect(mockAxiosPost.mock.calls[0][0]).toEqual(URL_LOGIN);
      expect(mockAxiosPost.mock.calls[0][1]).toEqual(BODY_MOCK);
    });
  });

  describe('connectionAPIPut', () => {
    it('should call axios.put', async () => {
      const mockAxiosPut = jest.spyOn(axios, 'put');

      mockAxios.onPut(URL_LOGIN).reply(200, RETURN_VALUE);

      const result = await connectionAPIPut(URL_LOGIN, BODY_MOCK);

      expect(result).toEqual(RETURN_VALUE);
      expect(mockAxiosPut.mock.calls[0][0]).toEqual(URL_LOGIN);
      expect(mockAxiosPut.mock.calls[0][1]).toEqual(BODY_MOCK);
    });
  });

  describe('connectionAPIPatch', () => {
    it('should call axios.patch', async () => {
      const mockAxiosPatch = jest.spyOn(axios, 'patch');

      mockAxios.onPatch(URL_LOGIN).reply(200, RETURN_VALUE);

      const result = await connectionAPIPatch(URL_LOGIN, BODY_MOCK);

      expect(result).toEqual(RETURN_VALUE);
      expect(mockAxiosPatch.mock.calls[0][0]).toEqual(URL_LOGIN);
      expect(mockAxiosPatch.mock.calls[0][1]).toEqual(BODY_MOCK);
    });
  });

  describe('connectionAPIDelete', () => {
    it('should call axios.delete', async () => {
      const mockAxiosDelete = jest.spyOn(axios, 'delete');

      mockAxios.onDelete(URL_LOGIN).reply(200, RETURN_VALUE);

      const result = await connectionAPIDelete(URL_LOGIN);

      expect(result).toEqual(RETURN_VALUE);
      expect(mockAxiosDelete.mock.calls[0][0]).toEqual(URL_LOGIN);
    });
  });

  describe('connect', () => {
    it('should return success', async () => {
      mockAxios.onGet(URL_LOGIN).reply(200, RETURN_VALUE);

      const returnGet = await ConnectionAPI.connect(URL_LOGIN, MethodsEnum.GET);

      expect(returnGet).toEqual(RETURN_VALUE);
    });

    it('should return error 401', async () => {
      mockAxios.onGet(URL_LOGIN).reply(401);

      await expect(ConnectionAPI.connect(URL_LOGIN, MethodsEnum.GET)).rejects.toThrowError(
        Error(ERROR_ACCESS_DANIED),
      );
    });

    it('should return error 403', async () => {
      mockAxios.onGet(URL_LOGIN).reply(403);

      await expect(ConnectionAPI.connect(URL_LOGIN, MethodsEnum.GET)).rejects.toThrowError(
        Error(ERROR_ACCESS_DANIED),
      );
    });

    it('should return error 400', async () => {
      mockAxios.onGet(URL_LOGIN).reply(400);

      await expect(ConnectionAPI.connect(URL_LOGIN, MethodsEnum.GET)).rejects.toThrowError(
        Error(ERROR_CONNECTION),
      );
    });
  });

  describe('call', () => {
    it('should send the authorization token in the header', async () => {
      const mockAxiosGet = jest.spyOn(axios, 'get');

      mockAxios.onGet(URL_LOGIN).reply(200, RETURN_VALUE);

      await ConnectionAPI.call(URL_LOGIN, MethodsEnum.GET);

      expect(mockAxiosGet.mock.calls[0][1]?.headers).toEqual({
        Authorization: mockToken,
        'Content-Type': 'application/json',
      });
    });
  });
});
