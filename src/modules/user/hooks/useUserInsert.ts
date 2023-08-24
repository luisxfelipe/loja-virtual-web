import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_USERS } from '../../../shared/constants/urls';
import { InsertUser } from '../../../shared/dtos/InsertUser.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { UserRoutesEnum } from '../routes';

export const useUserInsert = () => {
  const navigate = useNavigate();
  const { request, loading } = useRequests();
  const [disabledButton, setDisabledButton] = useState(true);
  const [user, setUser] = useState<InsertUser>({
    name: '',
    phone: '',
    email: '',
    cpf: '',
    password: '',
  });

  useEffect(() => {
    if (user.name && user.phone && user.email && user.cpf && user.password) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setUser({ ...user, [name]: event.target.value });
  };

  const handleCancelInsert = () => {
    navigate(UserRoutesEnum.USER);
  };

  const handleInsertAdmin = async () => {
    const result = await request(URL_USERS, MethodsEnum.POST, undefined, user);
    if (result) {
      navigate(UserRoutesEnum.USER);
    }
  };

  return {
    user,
    disabledButton,
    loading,
    handleCancelInsert,
    handleInsertAdmin,
    handleOnChangeInput,
  };
};
