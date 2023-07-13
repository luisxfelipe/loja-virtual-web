import { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { URL_PRODUCTS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ProductType } from '../../../shared/types/ProductType';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import CategoryColum from '../components/CategoryColum';
import TooltipImage from '../components/TooltipImage';
import { ProductRoutesEnum } from '../routes';

const columns: ColumnsType<ProductType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (_, product) => <TooltipImage product={product} />,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    key: 'category',
    render: (_, product) => <CategoryColum category={product.category} />,
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    render: (_, product) => <a>{convertNumberToMoney(product.price)}</a>,
  },
];

const Product = () => {
  const { products, setProducts } = useProductReducer();

  const { request } = useRequests();

  const navigate = useNavigate();

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCTS, MethodsEnum.GET, setProducts);
  }, []);

  const handleInsertProduct = () => {
    navigate(ProductRoutesEnum.PRODUCT_INSERT);
  };

  return (
    <Screen listBreadcrumb={[{ name: 'HOME' }, { name: 'PRODUTOS' }]}>
      <Button onClick={handleInsertProduct}>Novo Produto</Button>
      <Table columns={columns} dataSource={products} />
    </Screen>
  );
};

export default Product;
