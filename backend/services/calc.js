const Decimal = require('decimal.js');
module.exports = class CalculationService {

  /**
   *
   * @param {*} firstOperand
   * @param {*} secondOperand
   * @param {*} operation
   */
  doOperation(firstOperand, secondOperand, operation) {
    let result;

    if (operation === '+') {
      result = Decimal(firstOperand).plus(secondOperand);
    } else if (operation === '*') {
      result = Decimal(firstOperand).times(Decimal(secondOperand));
    } else if (operation === '-') {
      result = Decimal(firstOperand).minus(secondOperand);
    } else if (operation === '/') {
      result = Decimal(firstOperand).div(secondOperand);
    }

    return {
      firstOperand,
      secondOperand,
      operation,
      result: result.toString()
    };
  }

};
