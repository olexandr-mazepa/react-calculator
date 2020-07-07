

module.exports = class OperatorsController {

  constructor(calcService) {
    this.calcService = calcService;
  }

  _validateQuery(query) {
    const res = { errors: [] };

    if (!Object.prototype.hasOwnProperty.call(query, 'firstOperand')) {
      res.errors.push('A required query parameter \'firstOperand\' was not specified for this request');
    }

    if (!Object.prototype.hasOwnProperty.call(query, 'secondOperand')) {
      res.errors.push('A required query parameter \'secondOperand\' was not specified for this request');
    }

    return res;
  }

  add(req, res) {
    try {
      const validationRes = this._validateQuery(req.query);
      if (validationRes && validationRes.errors && validationRes.errors.length) {
        return res.invalidRequest(validationRes.errors);
      }

      const {
        firstOperand, secondOperand
      } = req.query;
      const result = this.calcService.doOperation(firstOperand, secondOperand, 'plus');
      return res.status(200).send(result);
    } catch (error) {
      return res.serverError(error);
    }
  }

  subtract(req, res) {
    try {
      const validationRes = this._validateQuery(req.query, res);
      if (validationRes && validationRes.errors && validationRes.errors.length) {
        return res.invalidRequest(validationRes.errors);
      }

      const {
        firstOperand, secondOperand
      } = req.query;
      const result = this.calcService.doOperation(firstOperand, secondOperand, 'subtract');
      return res.status(200).send(result);
    } catch (error) {
      return res.serverError(error);
    }
  }

  multiply(req, res) {
    try {
      const validationRes = this._validateQuery(req.query, res);
      if (validationRes && validationRes.errors && validationRes.errors.length) {
        return res.invalidRequest(validationRes.errors);
      }

      const {
        firstOperand, secondOperand
      } = req.query;
      const result = this.calcService.doOperation(firstOperand, secondOperand, 'multiply');
      return res.status(200).send(result);
    } catch (error) {
      return res.serverError(error);
    }
  }

  divide(req, res) {
    try {
      const validationRes = this._validateQuery(req.query, res);
      if (validationRes && validationRes.errors && validationRes.errors.length) {
        return res.invalidRequest(validationRes.errors);
      }

      const {
        firstOperand, secondOperand
      } = req.query;
      const result = this.calcService.doOperation(firstOperand, secondOperand, 'divide');
      return res.status(200).send(result);
    } catch (error) {
      return res.serverError(error);
    }
  }

};
