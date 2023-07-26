import { ColumnsType } from 'antd/es/table';

import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { OrderType } from '../../../shared/types/OrderType';
import { useOrder } from '../hooks/useOrder';

const columns: ColumnsType<OrderType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Data',
    dataIndex: 'date',
    key: 'date',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Usuário',
    dataIndex: 'user',
    key: 'user',
    render: (_, target) => <a>{target.user?.name}</a>,
  },
  {
    title: 'Qtd. Produtos',
    dataIndex: 'quantityProducts',
    key: 'quantityProducts',
    render: (text) => <a>{text}</a>,
  },
];

const Order = () => {
  const { orders } = useOrder();

  console.log('orders', orders);

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PEDIDOS',
        },
      ]}
    >
      <Table columns={columns} dataSource={orders} />
    </Screen>
  );
};

export default Order;
