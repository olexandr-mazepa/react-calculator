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
    if (operation === 'plus') {
      result = Decimal(firstOperand).plus(secondOperand);
    } else if (operation === 'multiply') {
      result = Decimal(firstOperand).times(Decimal(secondOperand));
    } else if (operation === 'subtract') {
      result = Decimal(firstOperand).minus(secondOperand);
    } else if (operation === 'divide') {
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
