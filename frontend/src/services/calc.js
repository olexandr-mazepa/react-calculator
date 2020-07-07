import Axios from 'axios';
const CalculationService = {
  _operationsDictionary: {
    plus: '+',
    subtract: '-',
    multiply: '*',
    divide: '/'
  },

  calculate: async function(operator, firstOperand, secondOperand) {
    const operation = this._getOperation(operator);

    const response = await this._makeCall(operation, firstOperand, secondOperand);
    if (response.errors && response.errors.length) {
      throw new Error(response.errors[0].message);
    }
    if(!response.data.result) {
      throw new Error('no result in response');
    }
    return response.data.result;

  },

  _makeCall: async (operation, firstOperand, secondOperand) => {

    return Axios({
      method: 'GET',
      url: `http://localhost:5000/api/operations/${operation}?firstOperand=${encodeURIComponent(firstOperand)}&secondOperand=${encodeURIComponent(secondOperand)}`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },

  _getOperation: function(operator) {
    const foundOperation = Object.entries(this._operationsDictionary).find(pair => {
      if (pair[1] === operator) {
        return true;
      }
      return false;
    });

    if (foundOperation && foundOperation.length) {
      return foundOperation[0];
    } else {
      throw new Error(`Unknown operator '${operator}'`);
    }
  }
};

export default CalculationService;