import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import InputMoney from '../../../shared/components/inputs/inputMoney/InputMoney';
import Select from '../../../shared/components/inputs/select/select';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustfyRight } from '../../../shared/components/styles/display.styles';
import { LimitedContainer } from '../../../shared/components/styles/limited.styles';
import { URL_CATEGORIES } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { CategoryType } from '../../../shared/types/CategoryType';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { useInsertProduct } from '../hooks/useInsertProduct';
import { ProductRoutesEnum } from '../routes';
import { ProductInsertContainer } from '../styles/productInsert.styles';

const ProductInsert = () => {
  const {
    product,
    loading,
    disabledButton,
    onChangeInput,
    handleInsertProduct,
    handleChangeSelect,
  } = useInsertProduct();

  const { categories, setCategories } = useCategoryReducer();
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length === 0) {
      request<CategoryType[]>(URL_CATEGORIES, MethodsEnum.GET, setCategories);
    }
  }, []);

  const handleOnClickedCancel = () => {
    navigate(ProductRoutesEnum.PRODUCT);
  };

  return (
    <Screen
      listBreadcrumb={[
        { name: 'HOME' },
        { name: 'PRODUTOS', navigateTo: ProductRoutesEnum.PRODUCT },
        { name: 'INSERIR PRODUTO' },
      ]}
    >
      <ProductInsertContainer>
        <LimitedContainer width={400}>
          <Input
            onChange={(event) => onChangeInput(event, 'name')}
            value={product.name}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'image')}
            value={product.image}
            margin="0px 0px 16px 0px"
            title="URL imagem"
            placeholder="URL imagem"
          />
          <InputMoney
            onChange={(event) => onChangeInput(event, 'price', true)}
            value={product.price}
            margin="0px 0px 16px 0px"
            title="Preço"
            placeholder="Preço"
          />
          <InputMoney
            onChange={(event) => onChangeInput(event, 'weight', true)}
            value={product.weight}
            margin="0px 0px 16px 0px"
            title="Peso"
            placeholder="Peso"
          />
          <InputMoney
            onChange={(event) => onChangeInput(event, 'length', true)}
            value={product.length}
            margin="0px 0px 16px 0px"
            title="Comprimento"
            placeholder="Comprimento"
          />
          <InputMoney
            onChange={(event) => onChangeInput(event, 'width', true)}
            value={product.width}
            margin="0px 0px 16px 0px"
            title="Largura"
            placeholder="Largura"
          />
          <InputMoney
            onChange={(event) => onChangeInput(event, 'height', true)}
            value={product.height}
            margin="0px 0px 16px 0px"
            title="Altura"
            placeholder="Altura"
          />
          <InputMoney
            onChange={(event) => onChangeInput(event, 'diameter', true)}
            value={product.diameter}
            margin="0px 0px 16px 0px"
            title="Diâmetro"
            placeholder="Diâmetro"
          />
          <Select
            title="Categoria"
            margin="0px 0px 32px 0px"
            onChange={handleChangeSelect}
            options={
              categories &&
              categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))
            }
          />
          <DisplayFlexJustfyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button danger onClick={handleOnClickedCancel}>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button
                loading={loading}
                disabled={disabledButton}
                onClick={handleInsertProduct}
                type="primary"
              >
                Inserir Produto
              </Button>
            </LimitedContainer>
          </DisplayFlexJustfyRight>
        </LimitedContainer>
      </ProductInsertContainer>
    </Screen>
  );
};

export default ProductInsert;
