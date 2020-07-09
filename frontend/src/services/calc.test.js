import CalculationService from './calc';
import '@testing-library/jest-dom/extend-expect';

it('should have calculate method', () => {
  expect(CalculationService).toHaveProperty('calculate');
});

it('should return result from response', async () => {
  const mockedCall = jest.fn();
  mockedCall.mockResolvedValue({ data: { result: '2' } });
  CalculationService._makeCall = mockedCall;
  const result = await CalculationService.calculate('+', '1', '1');
  expect(result).toBe('2');

});

it('should throw an error if response has error', async () => {
  const mockedCall = jest.fn();
  mockedCall.mockImplementation(() => {
    throw new Error('test error message');
  });
  CalculationService._makeCall = mockedCall;
  await expect(CalculationService.calculate('+', '1', '1')).rejects.toThrow('test error message');
});
