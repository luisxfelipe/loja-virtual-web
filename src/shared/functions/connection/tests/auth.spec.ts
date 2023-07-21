import { redirect } from 'react-router-dom';

import { LoginRoutesEnum } from '../../../../modules/login/routes';
import { AUTHORIZATION_KEY } from '../../../constants/authorizationConstants';
import {
    getAuthorizationToken, logout, setAuthorizationToken, unsetAuthorizationToken, verifyLoggedIn
} from '../auth';
import { connectionAPIGet } from '../connectionApi';
import { getItem, removeItem, setItem } from '../storageProxy';

jest.mock('../storageProxy');
jest.mock('../connectionAPI');
jest.mock('react-router-dom');

const MOCK_TOKEN = 'MOCK_TOKEN';

const mockGetItemStorage = getItem as jest.Mock;
const mockConnectionAPIGet = connectionAPIGet as jest.Mock;

describe('auth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('unsetAuthorizationToken', () => {
    it('should call removeItem', () => {
      unsetAuthorizationToken();
      expect(removeItem).toHaveBeenCalledWith(AUTHORIZATION_KEY);
    });
  });

  describe('setAuthorizationToken', () => {
    const MOCK_TOKEN = 'mockToken';

    it('should not call setItem', () => {
      setAuthorizationToken();
      expect(setItem).not.toBeCalled();
    });

    it('should call setItem', () => {
      setAuthorizationToken(MOCK_TOKEN);
      expect(setItem).toBeCalledWith(AUTHORIZATION_KEY, MOCK_TOKEN);
    });
  });

  describe('getAuthorizationToken', () => {
    it('should call getItem', () => {
      getAuthorizationToken();
      expect(getItem).toBeCalledWith(AUTHORIZATION_KEY);
    });
  });

  //describe('getUserInfoByToken', () => {});

  describe('verifyLoggedIn', () => {
    beforeEach(() => {
      mockGetItemStorage.mockReturnValue(MOCK_TOKEN);
      mockConnectionAPIGet.mockResolvedValue({ name: 'name' });
    });

    it('should call redirect when token is null', async () => {
      mockGetItemStorage.mockReturnValue(null);
      await verifyLoggedIn();
      expect(redirect).toHaveBeenCalledWith(LoginRoutesEnum.LOGIN);
    });

    it('should call unsetAuthorizationToken when user is null', async () => {
      mockConnectionAPIGet.mockRejectedValueOnce(new Error());
      await verifyLoggedIn();
      expect(removeItem).toHaveBeenCalledWith(AUTHORIZATION_KEY);
    });

    it('should call redirect when user is null', async () => {
      mockConnectionAPIGet.mockResolvedValue(null);
      await verifyLoggedIn();

      expect(redirect).toHaveBeenCalledWith(LoginRoutesEnum.LOGIN);
    });

    it('should return null when user is not null', async () => {
      const result = await verifyLoggedIn();

      expect(result).toBeNull();
    });
  });

  describe('logout', () => {
    it('should call navigate and unsetAuthorizationToken', () => {
      const MOCK_NAVIGATE = jest.fn();
      logout(MOCK_NAVIGATE);
      expect(MOCK_NAVIGATE).toHaveBeenCalledWith(LoginRoutesEnum.LOGIN);
      expect(removeItem).toHaveBeenCalledWith(AUTHORIZATION_KEY);
    });
  });
});
