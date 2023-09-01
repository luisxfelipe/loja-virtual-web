import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_CATEGORIES, URL_CATEGORY_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { CategoryRoutesEnum } from '../routes';

export const useCategory = () => {
  const { categories, setCategories } = useCategoryReducer();
  const [categoryIdDelete, setCategoryIdDelete] = useState<number | undefined>();
  const [categoriesFiltered, setCategoriesFiltered] = useState(categories);
  const { request } = useRequests();
  const navigate = useNavigate();

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

  const handleOnClickCategory = () => {
    navigate(CategoryRoutesEnum.CATEGORY_INSERT);
  };

  const handleOpenModalDelete = (categoryId: number) => {
    setCategoryIdDelete(categoryId);
  };

  const handleCloseModalDelete = () => {
    setCategoryIdDelete(undefined);
  };

  const handleConfirmDeleteCategory = async () => {
    await request(
      URL_CATEGORY_ID.replace('{categoryId}', `${categoryIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Categoria deletada com sucesso',
    );

    await request(URL_CATEGORIES, MethodsEnum.GET, setCategories);

    setCategoryIdDelete(undefined);
  };

  return {
    categories: categoriesFiltered,
    openModalDelete: !!categoryIdDelete,
    handleOnChangeSearch,
    handleOnClickCategory,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleConfirmDeleteCategory,
  };
};
