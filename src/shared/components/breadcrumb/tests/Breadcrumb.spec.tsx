import { render } from '@testing-library/react';

import Breadcrumb from '../Breadcrumb';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

export const enum BreadcrumbTestEnum {
  CONTAINER = 'CONTAINER',
  CONTAINER_NAVIGATE = 'CONTAINER_NAVIGATE',
}

const mockListBreadcrumb = [
  {
    name: 'nameMock',
  },
];

const mockListBreadcrumbWithNavigateTo = [
  {
    name: 'nameMock',
    navigateTo: 'navigateToMock',
  },
];

describe('Test Breadcrumb', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<Breadcrumb listBreadcrumb={[]} />);

    expect(getByTestId(BreadcrumbTestEnum.CONTAINER)).toBeInTheDocument();
  });

  it('should render correctly with listBreadcrumb', () => {
    const { queryAllByTestId, getByText } = render(
      <Breadcrumb listBreadcrumb={mockListBreadcrumb} />,
    );

    expect(queryAllByTestId(BreadcrumbTestEnum.CONTAINER)).toHaveLength(1);
    expect(queryAllByTestId(BreadcrumbTestEnum.CONTAINER_NAVIGATE)).toHaveLength(0);
    expect(getByText(mockListBreadcrumb[0].name)).toBeInTheDocument();
  });

  it('should render correctly with listBreadcrumb with navigateTo', () => {
    const { queryAllByTestId } = render(
      <Breadcrumb listBreadcrumb={mockListBreadcrumbWithNavigateTo} />,
    );

    expect(queryAllByTestId(BreadcrumbTestEnum.CONTAINER)).toHaveLength(1);
  });

  it('should run navigate when click on navigateTo', () => {
    const { getByTestId } = render(
      <Breadcrumb listBreadcrumb={mockListBreadcrumbWithNavigateTo} />,
    );

    const buttonNavigate = getByTestId(BreadcrumbTestEnum.CONTAINER_NAVIGATE);

    buttonNavigate.click();

    expect(mockNavigate).toHaveBeenCalledWith(mockListBreadcrumbWithNavigateTo[0].navigateTo);
  });
});
