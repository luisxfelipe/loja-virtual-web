import { fireEvent, render } from '@testing-library/react';

import InputMoney from '../InputMoney';

export enum InputMoneyTestEnum {
  INPUT = 'INPUT',
}

describe('Test InputMoney', () => {
  it('should render input', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(<InputMoney value={0} onChange={mockOnChange} />);
    const input = getByTestId(InputMoneyTestEnum.INPUT);

    expect(input).toBeInTheDocument();
  });

  it('should  inital value', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(<InputMoney value={0} onChange={mockOnChange} />);
    const input = getByTestId(InputMoneyTestEnum.INPUT);

    fireEvent.change(input, { target: { value: '0,00' } });

    expect(input).toHaveValue('0,00');
  });
});
