import { render, screen } from '@testing-library/react';

import Button from '../Button';

const TEXT_MOCK = 'TEXT_MOCK';
const TEST_ID_MOCK = 'TEST_ID_MOCK';
const MARGIN = '23px';

describe('Button', () => {
  beforeEach(() => {
    render(
      <Button data-testid={TEST_ID_MOCK} margin={MARGIN}>
        {TEXT_MOCK}
      </Button>,
    );
  });

  it('should render correctly', () => {
    expect(screen.getByText(TEXT_MOCK)).toBeInTheDocument();
  });

  it('should have margin', () => {
    expect(screen.getByTestId(TEST_ID_MOCK)).toHaveAttribute('style', `margin: ${MARGIN};`);
  });
});
