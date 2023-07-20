import { fireEvent, render } from '@testing-library/react';

import { ProductInsertTestIdEnum } from '../../enum/ProductInsertTestId.enum';
import { mockProductInsert } from '../../mocks/productInsert.mock';
import ProductInsert from '../ProductInsert';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../category/hooks/useCategory', () => ({
  useCategory: () => ({
    categories: [],
  }),
}));

let value = '';
let type = '';
const mockButtonInsert = jest.fn();

jest.mock('../../hooks/useInsertProduct', () => ({
  useInsertProduct: () => ({
    product: mockProductInsert,
    loading: false,
    disabledButton: false,
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>, x: string) => {
      value = e.target.value;
      type = x;
    },
    handleInsertProduct: mockButtonInsert,
    handleChangeSelect: jest.fn(),
  }),
}));

describe('ProductInsert', () => {
  it('should render', () => {
    const { getByTestId } = render(<ProductInsert />);

    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_CANCEL)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_NAME)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_SELECT)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_WEIGHT)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_WIDTH)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_HEIGHT)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_LENGTH)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_DIAMETER)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INSERT_CONTAINER)).toBeDefined();
  });

  it('should call onChangeInput when input name change', () => {
    const { getByTestId } = render(<ProductInsert />);
    const inputName = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_NAME);

    fireEvent.change(inputName, { target: { value: 'Teste' } });

    expect(value).toEqual('Teste');
    expect(type).toBe('name');
  });

  it('should call onChangeInput when input image change', () => {
    const { getByTestId } = render(<ProductInsert />);
    const inputImage = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE);

    fireEvent.change(inputImage, { target: { value: 'Teste' } });

    expect(value).toEqual('Teste');
    expect(type).toEqual('image');
  });

  it('should call onChangeInput when input price change', () => {
    const { getByTestId } = render(<ProductInsert />);
    const inputPrice = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE);

    fireEvent.change(inputPrice, { target: { value: 1098 } });

    expect(value).toEqual('10.98');
    expect(type).toEqual('price');
  });

  it('should call onChangeInput when input weight change', () => {
    const { getByTestId } = render(<ProductInsert />);
    const inputWeight = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_WEIGHT);

    fireEvent.change(inputWeight, { target: { value: 3000 } });

    expect(value).toEqual('30.00');
    expect(type).toEqual('weight');
  });

  it('should call onChangeInput when input width change', () => {
    const { getByTestId } = render(<ProductInsert />);
    const inputWidth = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_WIDTH);

    fireEvent.change(inputWidth, { target: { value: 3000 } });

    expect(value).toEqual('30.00');
    expect(type).toEqual('width');
  });

  it('should call onChangeInput when input height change', () => {
    const { getByTestId } = render(<ProductInsert />);
    const inputHeight = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_HEIGHT);

    fireEvent.change(inputHeight, { target: { value: 3000 } });

    expect(value).toEqual('30.00');
    expect(type).toEqual('height');
  });

  it('should call onChangeInput when input length change', () => {
    const { getByTestId } = render(<ProductInsert />);
    const inputLength = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_LENGTH);

    fireEvent.change(inputLength, { target: { value: 3000 } });

    expect(value).toEqual('30.00');
    expect(type).toEqual('length');
  });

  it('should call onChangeInput when input diameter change', () => {
    const { getByTestId } = render(<ProductInsert />);
    const inputDiameter = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_DIAMETER);

    fireEvent.change(inputDiameter, { target: { value: 3000 } });

    expect(value).toEqual('30.00');
    expect(type).toEqual('diameter');
  });

  it('should call handleInsertProduct when button insert clicked', () => {
    const { getByTestId } = render(<ProductInsert />);
    const buttonInsert = getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT);

    fireEvent.click(buttonInsert);

    expect(mockButtonInsert).toBeCalled();
  });

  it('should call navigate when button cancel clicked', () => {
    const { getByTestId } = render(<ProductInsert />);
    const buttonCancel = getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_CANCEL);

    fireEvent.click(buttonCancel);

    expect(mockNavigate).toBeCalled();
  });
});
