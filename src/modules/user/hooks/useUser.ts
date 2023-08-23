import { useEffect, useState } from 'react';

import { URL_USERS_ALL } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import { UserType } from '../../login/types/UserType';

export const useUser = () => {
  const { users, setUsers } = useUserReducer();
  const [usersFiltered, setUsersFiltered] = useState(users);
  const { request, loading } = useRequests();

  useEffect(() => {
    if (!users || users.length === 0) {
      request(URL_USERS_ALL, MethodsEnum.GET, setUsers);
    }
  }, []);

  useEffect(() => {
    setUsersFiltered(users);
  }, [users]);

  const handleOnChangeSearch = (value: string) => {
    if (!value) {
      setUsersFiltered([...users]);
    } else {
      const usersFiltered = users.filter((user: UserType) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      });
      setUsersFiltered(usersFiltered);
    }
  };

  return { users: usersFiltered, loading, handleOnChangeSearch };
};
