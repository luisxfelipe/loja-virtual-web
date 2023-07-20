import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { act, renderHook } from '@testing-library/react';

import { URL_PRODUCTS } from '../../../../shared/constants/urls';
import { useInsertProduct } from '../useInsertProduct';

const mockAxios = new MockAdapter(axios);

mockAxios.onPost(URL_PRODUCTS, {});

const mockNavigate = jest.fn();
const mockSetNotification = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../../store/reducers/globalReducer/useGlobalReducer', () => ({
  useGlobalReducer: () => ({
    setNotification: mockSetNotification,
  }),
}));

describe('useInsertProduct', () => {
  it('should return initial values', () => {
    const { result } = renderHook(() => useInsertProduct());
    expect(result.current.loading).toBeFalsy();
    expect(result.current.disabledButton).toBeTruthy();
    expect(result.current.product).toEqual({
      name: '',
      price: 0,
      image: '',
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      diameter: 0,
    });
  });

  it('should change select in handleChangeSelect', () => {
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.handleChangeSelect('1');
    });

    expect(result.current.product.categoryId).toEqual(1);
  });

  it('should change input in onChangeInput when send name', () => {
    const TEST_MOCK = 'Teste';
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.onChangeInput(
        {
          target: { value: TEST_MOCK },
        } as React.ChangeEvent<HTMLInputElement>,
        'name',
      );
    });

    expect(result.current.product.name).toEqual(TEST_MOCK);
  });

  it('should change input in onChangeInput when send price', () => {
    const TEST_MOCK = '10';
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.onChangeInput(
        {
          target: { value: TEST_MOCK },
        } as React.ChangeEvent<HTMLInputElement>,
        'price',
        true,
      );
    });

    expect(result.current.product.price).toEqual(Number(TEST_MOCK));
  });

  it('should change disabledButton in onChangeInput when send all values', () => {
    const { result } = renderHook(() => useInsertProduct());

    expect(result.current.disabledButton).toBeTruthy();

    act(() => {
      result.current.onChangeInput(
        {
          target: { value: 'Teste' },
        } as React.ChangeEvent<HTMLInputElement>,
        'name',
      );
    });

    expect(result.current.disabledButton).toBeTruthy();

    act(() => {
      result.current.onChangeInput(
        {
          target: { value: 'Teste' },
        } as React.ChangeEvent<HTMLInputElement>,
        'image',
      );
    });

    expect(result.current.disabledButton).toBeTruthy();

    act(() => {
      result.current.handleChangeSelect('1');
    });

    expect(result.current.disabledButton).toBeTruthy();

    act(() => {
      result.current.onChangeInput(
        {
          target: { value: '10' },
        } as React.ChangeEvent<HTMLInputElement>,
        'price',
        true,
      );
    });

    expect(result.current.disabledButton).toBeTruthy();

    act(() => {
      result.current.onChangeInput(
        {
          target: { value: '10' },
        } as React.ChangeEvent<HTMLInputElement>,
        'weight',
        true,
      );
    });

    expect(result.current.disabledButton).toBeTruthy();

    act(() => {
      result.current.onChangeInput(
        {
          target: { value: '10' },
        } as React.ChangeEvent<HTMLInputElement>,
        'length',
        true,
      );
    });

    expect(result.current.disabledButton).toBeTruthy();

    act(() => {
      result.current.onChangeInput(
        {
          target: { value: '10' },
        } as React.ChangeEvent<HTMLInputElement>,
        'width',
        true,
      );
    });

    expect(result.current.disabledButton).toBeTruthy();

    act(() => {
      result.current.onChangeInput(
        {
          target: { value: '10' },
        } as React.ChangeEvent<HTMLInputElement>,
        'height',
        true,
      );
    });

    expect(result.current.disabledButton).toBeTruthy();

    act(() => {
      result.current.onChangeInput(
        {
          target: { value: '10' },
        } as React.ChangeEvent<HTMLInputElement>,
        'diameter',
        true,
      );
    });

    expect(result.current.disabledButton).toBeFalsy();

    act(() => {
      result.current.onChangeInput(
        {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>,
        'diameter',
        true,
      );
    });

    expect(result.current.disabledButton).toBeTruthy();
  });

  it('should call axios.pois', async () => {
    const spyAxios = jest.spyOn(axios, 'post');

    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.handleInsertProduct();
    });

    expect(spyAxios.mock.calls[0][1]).toEqual(result.current.product);

    expect(spyAxios).toBeCalledTimes(1);
  });
});
