import { render, screen } from '@testing-library/react';

import { InputTestIdEnum } from '../enum/inputTestIdEnum';
import Input from '../Input';

const TITLE_MOCK = 'TITLE_MOCK';
const TEST_ID = 'TEST_ID_INPUT';
const MARGIN = '23px';

describe('Input', () => {
  beforeEach(() => {
    render(<Input data-testid={TEST_ID} margin={MARGIN} />);
  });

  it('should render correctly', () => {
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(InputTestIdEnum.BOX_INPUT)).toBeInTheDocument();
  });

  it('should have margin', () => {
    expect(screen.getByTestId(InputTestIdEnum.BOX_INPUT)).toHaveAttribute(
      'style',
      `margin: ${MARGIN};`,
    );
  });

  it('should hide Title when title is undefined', () => {
    const element = screen.queryAllByTestId(InputTestIdEnum.INPUT_TITLE);

    expect(element.length).toEqual(0);
  });

  it('should show Title when title is defined', () => {
    const { queryAllByTestId } = render(<Input title={TITLE_MOCK} />);
    const element = queryAllByTestId(InputTestIdEnum.INPUT_TITLE);

    expect(element.length).toEqual(1);
  });

  it('should show Title when title is defined', () => {
    const { getByText } = render(
      <Input title={TITLE_MOCK} data-testid={TEST_ID} margin={MARGIN} />,
    );
    const element = getByText(TITLE_MOCK);

    expect(element).toBeDefined();
  });
});
