import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_USERS } from '../../../shared/constants/urls';
import {
  getAuthorizationToken,
  unsetAuthorizationToken,
} from '../../../shared/functions/connection/auth';
import { connectionAPIGet } from '../../../shared/functions/connection/connectionApi';
import { LoginRoutesEnum } from '../../login/routes';
import { ProductRoutesEnum } from '../../product/routes';

const FirstScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const veryfyToken = async () => {
      const token = getAuthorizationToken();

      if (token) {
        await connectionAPIGet(URL_USERS)
          .then(() => {
            navigate(ProductRoutesEnum.PRODUCT);
          })
          .catch(() => {
            unsetAuthorizationToken();
            navigate(LoginRoutesEnum.LOGIN);
          });
      } else {
        navigate(LoginRoutesEnum.LOGIN);
      }
    };

    veryfyToken();
  }, []);

  return <Spin />;
};

export default FirstScreen;
