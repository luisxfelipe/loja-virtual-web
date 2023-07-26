import { Descriptions, Divider } from 'antd';

import Screen from '../../../shared/components/screen/Screen';
import { OrderRoutesEnum } from '../routes';

const OrderDetail = () => {
  return (
    <Screen
      listBreadcrumb={[
        { name: 'HOME' },
        { name: 'PEDIDOS', navigateTo: OrderRoutesEnum.ORDER },
        { name: 'DETALHES' },
      ]}
    >
      <Descriptions title="Dados do usuário" bordered>
        <Descriptions.Item label="Nome">Felipe</Descriptions.Item>
        <Descriptions.Item label="E-mail" span={2}>
          Prepaid
        </Descriptions.Item>
        <Descriptions.Item label="Telefone">YES</Descriptions.Item>
        <Descriptions.Item label="CPF" span={2}>
          2018-04-24 18:00:00
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="Dados do pagamento" bordered>
        <Descriptions.Item label="Nome">Felipe</Descriptions.Item>
        <Descriptions.Item label="E-mail" span={2}>
          Prepaid
        </Descriptions.Item>
        <Descriptions.Item label="Telefone">YES</Descriptions.Item>
        <Descriptions.Item label="CPF" span={2}>
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="Dados do endereço" bordered>
        <Descriptions.Item label="Nome">Felipe</Descriptions.Item>
        <Descriptions.Item label="E-mail" span={2}>
          Prepaid
        </Descriptions.Item>
        <Descriptions.Item label="Telefone">YES</Descriptions.Item>
        <Descriptions.Item label="CPF" span={2}>
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="Dados do produtos" bordered>
        <Descriptions.Item label="Nome">Felipe</Descriptions.Item>
        <Descriptions.Item label="E-mail" span={2}>
          Prepaid
        </Descriptions.Item>
        <Descriptions.Item label="Telefone">YES</Descriptions.Item>
        <Descriptions.Item label="CPF" span={2}>
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
      </Descriptions>
    </Screen>
  );
};

export default OrderDetail;
