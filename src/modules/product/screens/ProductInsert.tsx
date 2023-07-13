import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Select from '../../../shared/components/inputs/select/select';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustfyRight } from '../../../shared/components/styles/display.styles';
import { LimitedContainer } from '../../../shared/components/styles/limited.styles';
import { URL_CATEGORIES, URL_PRODUCTS } from '../../../shared/constants/urls';
import { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionApi';
import { useRequests } from '../../../shared/hooks/useRequests';
import { CategoryType } from '../../../shared/types/CategoryType';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { ProductRoutesEnum } from '../routes';
import { ProductInsertContainer } from '../styles/productInsert.styles';

const ProductInsert = () => {
  const [product, setProduct] = useState<InsertProduct>({
    name: '',
    price: 0,
    image: '',
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    diameter: 0,
  });
  const { categories, setCategories } = useCategoryReducer();
  const { setNotification } = useGlobalReducer();
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length === 0) {
      request<CategoryType[]>(URL_CATEGORIES, MethodsEnum.GET, setCategories);
    }
  }, []);

  const handleInsertProduct = async () => {
    await connectionAPIPost(URL_PRODUCTS, product)
      .then(() => {
        setNotification('Sucesso', 'success', 'Produto inserido com sucesso!');
        navigate(ProductRoutesEnum.PRODUCT);
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
      });
  };

  const handleOnClickedCancel = () => {
    navigate(ProductRoutesEnum.PRODUCT);
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setProduct({
      ...product,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    });
  };

  const handleChange = (value: string) => {
    setProduct({ ...product, categoryId: Number(value) });
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
            onChange={(event) => onChange(event, 'name')}
            value={product.name}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            onChange={(event) => onChange(event, 'image')}
            value={product.image}
            margin="0px 0px 16px 0px"
            title="URL imagem"
            placeholder="URL imagem"
          />
          <Input
            onChange={(event) => onChange(event, 'price', true)}
            value={product.price}
            margin="0px 0px 16px 0px"
            title="Preço"
            placeholder="Preço"
          />
          <Input
            onChange={(event) => onChange(event, 'weight', true)}
            value={product.weight}
            margin="0px 0px 16px 0px"
            title="Peso"
            placeholder="Peso"
          />
          <Input
            onChange={(event) => onChange(event, 'length', true)}
            value={product.length}
            margin="0px 0px 16px 0px"
            title="Comprimento"
            placeholder="Comprimento"
          />
          <Input
            onChange={(event) => onChange(event, 'width', true)}
            value={product.width}
            margin="0px 0px 16px 0px"
            title="Largura"
            placeholder="Largura"
          />
          <Input
            onChange={(event) => onChange(event, 'height', true)}
            value={product.height}
            margin="0px 0px 16px 0px"
            title="Altura"
            placeholder="Altura"
          />
          <Input
            onChange={(event) => onChange(event, 'diameter', true)}
            value={product.diameter}
            margin="0px 0px 16px 0px"
            title="Diâmetro"
            placeholder="Diâmetro"
          />
          <Select
            title="Categoria"
            margin="0px 0px 32px 0px"
            onChange={handleChange}
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
              <Button onClick={handleInsertProduct} type="primary">
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
