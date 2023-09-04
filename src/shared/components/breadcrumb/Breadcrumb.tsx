import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { useNavigate } from 'react-router-dom';

import { BreadcrumbTestEnum } from './tests/Breadcrumb.spec';

export interface ListBreadcrumb {
  name: string;
  navigateTo?: string;
}

interface BreadcrumbProps {
  listBreadcrumb: ListBreadcrumb[];
}

const Breadcrumb = ({ listBreadcrumb }: BreadcrumbProps) => {
  const navigate = useNavigate();

  const handleGoToClick = (navigateTo: string) => {
    navigate(navigateTo);
  };

  return (
    <BreadcrumbAntd
      data-testid={BreadcrumbTestEnum.CONTAINER}
      items={listBreadcrumb.map((breadcrumb, index) => ({
        title: breadcrumb.navigateTo ? (
          <a
            data-testid={BreadcrumbTestEnum.CONTAINER_NAVIGATE}
            onClick={() => handleGoToClick(breadcrumb.navigateTo || '')}
          >
            {breadcrumb.name}
          </a>
        ) : (
          breadcrumb.name
        ),
        key: `breadcrumb_${index}`,
      }))}
    />
  );
};

export default Breadcrumb;
