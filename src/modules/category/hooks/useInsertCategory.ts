import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_CATEGORIES } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { CategoryRoutesEnum } from '../routes';

export const useInsertCategory = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const { request } = useRequests();
  const { setCategories } = useCategoryReducer();

  useEffect(() => {
    if (name) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [name]);

  const insertCategory = async () => {
    setLoading(true);

    await request(URL_CATEGORIES, MethodsEnum.POST, undefined, { name });
    await request(URL_CATEGORIES, MethodsEnum.GET, setCategories);

    setLoading(false);

    navigate(CategoryRoutesEnum.CATEGORY);
  };

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return {
    name,
    handleOnChangeName,
    loading,
    disabledButton,
    insertCategory,
  };
};
