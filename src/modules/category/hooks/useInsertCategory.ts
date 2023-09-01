import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { URL_CATEGORIES, URL_CATEGORY_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { CategoryRoutesEnum } from '../routes';

export const useInsertCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [disabledButton, setDisabledButton] = useState(true);
  const { request, loading } = useRequests();
  const { setCategories, category, setCategory } = useCategoryReducer();

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  useEffect(() => {
    if (name) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [name]);

  useEffect(() => {
    if (categoryId) {
      request(URL_CATEGORY_ID.replace('{categoryId}', categoryId), MethodsEnum.GET, setCategory);
    } else {
      setName('');
    }
  }, [categoryId]);

  const insertCategory = async () => {
    if (categoryId) {
      await request(
        URL_CATEGORY_ID.replace('{categoryId}', categoryId),
        MethodsEnum.PATCH,
        undefined,
        { name },
      );
    } else {
      await request(URL_CATEGORIES, MethodsEnum.POST, undefined, { name });
    }

    await request(URL_CATEGORIES, MethodsEnum.GET, setCategories);

    navigate(CategoryRoutesEnum.CATEGORY);
  };

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return {
    name,
    categoryId,
    handleOnChangeName,
    loading,
    disabledButton,
    insertCategory,
  };
};
