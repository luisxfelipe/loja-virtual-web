import { Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import { DeleteOutlined } from '@ant-design/icons';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import {
    DisplayFlex, DisplayFlexJustifyBetween
} from '../../../shared/components/styles/display.styles';
import { LimitedContainer } from '../../../shared/components/styles/limited.styles';
import Table from '../../../shared/components/table/Table';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { ProductType } from '../../../shared/types/ProductType';
import CategoryColum from '../components/CategoryColum';
import TooltipImage from '../components/TooltipImage';
import { useProduct } from '../hooks/useProduct';

const { Search } = Input;

const Product = () => {
  const { productsFiltered, handleOnClickInsert, onSearch, handleDeleteProduct } = useProduct();

  const columns: ColumnsType<ProductType> = useMemo(
    () => [
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
        sorter: (a, b) => a.name.localeCompare(b.name),
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
        render: (_, product) => <a>{convertNumberToMoney(Number(product.price))}</a>,
      },
      {
        title: 'Ações',
        width: 240,
        key: 'action',
        render: (_, product) => (
          <LimitedContainer width={180}>
            <DisplayFlex>
              <Button
                onClick={() => handleDeleteProduct(product.id)}
                danger
                icon={<DeleteOutlined />}
              >
                Deletar
              </Button>
            </DisplayFlex>
          </LimitedContainer>
        ),
      },
    ],
    [],
  );

  return (
    <Screen listBreadcrumb={[{ name: 'HOME' }, { name: 'PRODUTOS' }]}>
      <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar produto" onSearch={onSearch} enterButton />
        </LimitedContainer>
        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickInsert}>
            Novo Produto
          </Button>
        </LimitedContainer>
      </DisplayFlexJustifyBetween>
      <Table columns={columns} dataSource={productsFiltered} />
    </Screen>
  );
};

export default Product;
