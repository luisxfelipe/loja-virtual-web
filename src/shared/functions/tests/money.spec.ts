import { convertNumberToMoney } from '../money';

describe('money', () => {
  it('should return the correct value with 2 decimals and R$ prefix', () => {
    const money = convertNumberToMoney(10);
    expect(money).toContain('R$');
    expect(money).toContain('10,00');
  });

  it('should return the correct value with 2 decimals and R$ prefix', () => {
    const money = convertNumberToMoney(10.5);
    expect(money).toContain('R$');
    expect(money).toContain('10,50');
  });

  it('should return the correct value with 2 decimals and R$ prefix', () => {
    const money = convertNumberToMoney(10.53);
    expect(money).toContain('R$');
    expect(money).toContain('10,53');
  });

  it('should return the correct value with dot separator when the number is greater than 999', () => {
    const money = convertNumberToMoney(456874.87);
    expect(money).toContain('R$');
    expect(money).toContain('456.874,87');
  });
});
