import { ColumnsType } from 'antd/es/table';

import Table from '../../../shared/components/table/Table';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { OrderProductType } from '../../../shared/types/OrderProductType';

const columns: ColumnsType<OrderProductType> = [
  {
    title: 'Nome Produto',
    dataIndex: 'name',
    key: 'name',
    render: (_, target) => <a>{target.product?.name}</a>,
  },
  {
    title: 'Quantidade',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    render: (_, target) => <a>{convertNumberToMoney(target.price)}</a>,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render: (_, target) => <a>{convertNumberToMoney(target.price * target.quantity)}</a>,
  },
];

interface ListOrderProductProps {
  ordersProduct?: OrderProductType[];
}

const ListOrderProduct = ({ ordersProduct }: ListOrderProductProps) => {
  if (!ordersProduct || ordersProduct.length <= 0) {
    return null;
  }

  return <Table columns={columns} dataSource={ordersProduct} />;
};

export default ListOrderProduct;
