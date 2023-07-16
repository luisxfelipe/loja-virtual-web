import { fireEvent, render } from '@testing-library/react';

import { logout } from '../../../functions/connection/auth';
import { HeaderTestIdEnum } from '../enum/headerTestIdEnum';
import Header from '../Header';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../../functions/connection/auth', () => ({
  logout: jest.fn(),
}));

describe('Header', () => {
  it('should render with container and logo', () => {
    const { getByTestId } = render(<Header />);

    expect(getByTestId(HeaderTestIdEnum.HEADER_CONTAINER)).toBeDefined();
    expect(getByTestId(HeaderTestIdEnum.HEADER_LOGO)).toBeDefined();
  });

  it('should render modal when click on logo', () => {
    const { getByTestId, queryAllByTestId } = render(<Header />);
    const logo = getByTestId(HeaderTestIdEnum.HEADER_LOGO);

    expect(queryAllByTestId(HeaderTestIdEnum.HEADER_MODAL)).toHaveLength(0);

    fireEvent.click(logo);

    expect(queryAllByTestId(HeaderTestIdEnum.HEADER_MODAL)).toHaveLength(1);
  });

  it('should call logout when click logo and confirm logout', () => {
    const { getByTestId, getByText } = render(<Header />);
    const logo = getByTestId(HeaderTestIdEnum.HEADER_LOGO);

    fireEvent.click(logo);

    const confirmButton = getByText('Sim');

    fireEvent.click(confirmButton);

    expect(logout).toHaveBeenCalled();
  });
});
