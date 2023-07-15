import { useEffect, useState } from 'react';

import { URL_CATEGORIES } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';

export const useCategory = () => {
  const { categories, setCategories } = useCategoryReducer();
  const [categoriesFiltered, setCategoriesFiltered] = useState(categories);
  const { request } = useRequests();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      request(URL_CATEGORIES, MethodsEnum.GET, setCategories);
    }
  }, []);

  useEffect(() => {
    setCategoriesFiltered([...categories]);
  }, [categories]);

  const handleOnChangeSearch = (value: string) => {
    if (value) {
      setCategoriesFiltered([
        ...categories.filter((category) =>
          category.name.toLowerCase().includes(value.toLowerCase()),
        ),
      ]);
    } else {
      setCategoriesFiltered([...categories]);
    }
  };

  return { categories: categoriesFiltered, handleOnChangeSearch };
};
