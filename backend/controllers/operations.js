

module.exports = class OperatorsController {

  constructor(calcService) {
    this.calcService = calcService;
  }

  _validateQuery(query) {

    if (!Object.prototype.hasOwnProperty.call(query, 'firstOperand')) {
      return 'A required query parameter \'firstOperand\' was not specified for this request';
    }

    if (!Object.prototype.hasOwnProperty.call(query, 'secondOperand')) {
      return 'A required query parameter \'secondOperand\' was not specified for this request';
    }

    if (!Object.prototype.hasOwnProperty.call(query, 'operator')) {
      return 'A required query parameter \'operator\' was not specified for this request';
    }

    const allowedOperators = ['+', '*', '-', '/'];
    if (!allowedOperators.includes(query.operator)) {
      return `Unknown operator '${query.operator}'`;
    }

    return '';
  }

  calculate(req, res) {
    try {
      const validationErr = this._validateQuery(req.query);
      if (validationErr) {
        return res.invalidRequest(validationErr);
      }

      const {
        firstOperand, secondOperand, operator
      } = req.query;
      const result = this.calcService.doOperation(firstOperand, secondOperand, operator);
      return res.status(200).send(result);
    } catch (error) {
      return res.serverError(error);
    }
  }

};
