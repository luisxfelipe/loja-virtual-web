import { Descriptions, Divider } from 'antd';
import { useParams } from 'react-router-dom';

import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyCenter } from '../../../shared/components/styles/display.styles';
import { insertMaskInCep } from '../../../shared/functions/address';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import ListOrderProduct from '../components/ListOrderProduct';
import { useOrderDetail } from '../hooks/useOrderDetail';
import { OrderRoutesEnum } from '../routes';

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { order, loading } = useOrderDetail(orderId);

  return (
    <Screen
      listBreadcrumb={[
        { name: 'HOME' },
        { name: 'PEDIDOS', navigateTo: OrderRoutesEnum.ORDER },
        { name: 'DETALHES' },
      ]}
    >
      {!order || loading ? (
        <DisplayFlexJustifyCenter>
          <Loading size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
        <>
          <Descriptions title="Dados do usuário" bordered>
            <Descriptions.Item label="Nome">{order.user?.name}</Descriptions.Item>
            <Descriptions.Item label="E-mail" span={2}>
              {order.user?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Telefone">
              {insertMaskInPhone(order.user?.phone)}
            </Descriptions.Item>
            <Descriptions.Item label="CPF" span={2}>
              {insertMaskInCpf(order.user?.cpf)}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions title="Dados do pagamento" bordered>
            <Descriptions.Item label="Preço">
              {convertNumberToMoney(Number(order.payment?.price || 0))}
            </Descriptions.Item>
            <Descriptions.Item label="Desconto" span={2}>
              {convertNumberToMoney(Number(order.payment?.discount || 0))}
            </Descriptions.Item>
            <Descriptions.Item label="Preço Final">
              {convertNumberToMoney(Number(order.payment?.finalPrice || 0))}
            </Descriptions.Item>
            <Descriptions.Item label="Tipo de pagamento" span={2}>
              {order.payment?.type}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={2}>
              {order.payment?.paymentStatus?.status}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions title="Dados do endereço" bordered>
            <Descriptions.Item label="Cidade">{order.address?.city?.name}</Descriptions.Item>
            <Descriptions.Item label="Estado">{order.address?.city?.state?.name}</Descriptions.Item>
            <Descriptions.Item label="Complemento">{order.address?.complement}</Descriptions.Item>
            <Descriptions.Item label="Número">{order.address?.number}</Descriptions.Item>
            <Descriptions.Item label="CEP" span={2}>
              {insertMaskInCep(order.address?.cep || '')}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <ListOrderProduct ordersProduct={order.orderProducts} />
        </>
      )}
    </Screen>
  );
};

export default OrderDetail;
