import CalculationService from './calc';
import '@testing-library/jest-dom/extend-expect';

it('should have calculate method', () => {
  expect(CalculationService).toHaveProperty('calculate');
});

it('should transform mathematic operator to word', () => {
  const mockedCall = jest.fn();
  mockedCall.mockResolvedValue({ data: { result: '2' } });

  CalculationService._makeCall = mockedCall;
  CalculationService.calculate('+', '1', '1');

  expect(mockedCall).toHaveBeenCalledWith('plus', '1', '1');
});

it('should throw an error if operator are unknown', async () => {
  await expect(CalculationService.calculate('log', '1', '1')).rejects.toThrow('Unknown operator \'log\'');
});

it('should return result from response', async () => {
  const mockedCall = jest.fn();
  mockedCall.mockResolvedValue({ data: { result: '2' } });
  CalculationService._makeCall = mockedCall;
  const result = await CalculationService.calculate('+', '1', '1');
  expect(result).toBe('2');

});

it('should throw an error if response has errors', async () => {
  const mockedCall = jest.fn();
  mockedCall.mockResolvedValue({ errors: [{ message: 'test error message' }] });
  CalculationService._makeCall = mockedCall;
  await expect(CalculationService.calculate('+', '1', '1')).rejects.toThrow('test error message');
});

it('should throw an error if response doesn\'t have a result', async () => {
  const mockedCall = jest.fn();
  mockedCall.mockResolvedValue({ data: {} });
  CalculationService._makeCall = mockedCall;
  await expect(CalculationService.calculate('+', '1', '1')).rejects.toThrow('no result in response');
});
