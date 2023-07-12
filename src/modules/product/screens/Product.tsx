import { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';

import Table from '../../../shared/components/table/Table';
import { URL_PRODUCTS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ProductType } from '../../../shared/types/ProductType';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import CategoryColum from '../components/CategoryColum';
import TooltipImage from '../components/TooltipImage';

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
  },
];

const Product = () => {
  const { products, setProducts } = useProductReducer();

  const { request } = useRequests();

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCTS, MethodsEnum.GET, setProducts);
  }, []);

  return <Table columns={columns} dataSource={products} />;
};

export default Product;
