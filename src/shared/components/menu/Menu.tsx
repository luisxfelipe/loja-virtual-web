import { Menu as ManuAntd } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    AppstoreOutlined, HomeOutlined, ShoppingOutlined, TagOutlined, UserOutlined
} from '@ant-design/icons';

import { CategoryRoutesEnum } from '../../../modules/category/routes';
import { OrderRoutesEnum } from '../../../modules/orders/routes';
import { ProductRoutesEnum } from '../../../modules/product/routes';
import { UserRoutesEnum } from '../../../modules/user/routes';
import { ContainerLogoName, ContainerMenu, LogoMenu, NameCompany } from './menu.styles';

import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

const Menu = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Principal',
      icon: <HomeOutlined />,
    },
    {
      key: 'products',
      label: 'Produtos',
      icon: <ShoppingOutlined />,
      children: [
        {
          key: 'products_view',
          label: 'Visualizar',
          onClick: () => navigate(ProductRoutesEnum.PRODUCT),
        },
        {
          key: 'products_insert',
          label: 'Inserir',
          onClick: () => navigate(ProductRoutesEnum.PRODUCT_INSERT),
        },
      ],
    },
    {
      key: 'categories',
      label: 'Categorias',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: 'categories_view',
          label: 'Visualizar',
          onClick: () => navigate(CategoryRoutesEnum.CATEGORY),
        },
        {
          key: 'categories_insert',
          label: 'Inserir',
          onClick: () => navigate(CategoryRoutesEnum.CATEGORY_INSERT),
        },
      ],
    },
    {
      key: 'order',
      label: 'Pedidos',
      icon: <TagOutlined />,
      onClick: () => navigate(OrderRoutesEnum.ORDER),
    },
    {
      key: 'user',
      label: 'Clientes',
      icon: <UserOutlined />,
      onClick: () => navigate(UserRoutesEnum.USER),
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <ContainerMenu>
      <ContainerLogoName>
        <LogoMenu />
        <NameCompany>Vendas Online</NameCompany>
      </ContainerLogoName>
      <ManuAntd
        theme="dark"
        onClick={onClick}
        style={{ width: 240 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </ContainerMenu>
  );
};

export default Menu;
