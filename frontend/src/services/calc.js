import Axios from 'axios';
const CalculationService = {

  calculate: async function(operation, firstOperand, secondOperand) {
    try {
      const response = await this._makeCall(operation, firstOperand, secondOperand);
      if (response.data && response.data.result) {
        return response.data.result;
      }
    } catch (error) {
      throw new Error(error.message);
    }

  },

  _makeCall: async (operation, firstOperand, secondOperand) => {

    return Axios({
      method: 'GET',
      url: `http://localhost:5000/api/calculate/?firstOperand=${encodeURIComponent(firstOperand)}&secondOperand=${encodeURIComponent(secondOperand)}&operator=${encodeURIComponent(operation)}`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export default CalculationService;