import { getItem, removeItem, setItem } from '../storageProxy';

const MOCK_KEY = 'mockKey';
const MOCK_VALUE = 'mockValue';

describe('storageProxy', () => {
  it('should save the value in the localStorage', () => {
    setItem(MOCK_KEY, MOCK_VALUE);
    expect(getItem(MOCK_KEY)).toEqual(MOCK_VALUE);
  });

  it('should remove the value from the localStorage', () => {
    setItem(MOCK_KEY, MOCK_VALUE);
    removeItem(MOCK_KEY);
    expect(getItem(MOCK_KEY)).toBeNull();
  });
});
