import { useEffect } from 'react';

import { URL_CATEGORIES } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';

export const useCategory = () => {
  const { categories, setCategories } = useCategoryReducer();
  const { request } = useRequests();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      request(URL_CATEGORIES, MethodsEnum.GET, setCategories);
    }
  }, []);

  return { categories };
};
