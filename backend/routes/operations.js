const OperationsController = require('../controllers/operations');
const CalcService = require('../services/calc');
const operationsController = new OperationsController(new CalcService());

module.exports.init = app => {

  /**
   * @swagger
   * /api/calculate:
   *   get:
   *     description: do calculations for the input values
   *     produces:
   *       - application/json
   *     tags:
   *       - Operations
   *     security:
   *       - UserSecurity: []
   *     parameters:
   *       - name: firstOperand
   *         in: query
   *         type: string
   *       - name: secondOperand
   *         in: query
   *         type: string
   *       - name: operator
   *         in: query
   *         type: sting
   *     responses:
   *       200:
   *         $ref: "#/definitions/CalculationResponse"
   *       400:
   *         $ref: "#/responses/Error400"
   *       500:
   *         $ref: "#/responses/Error500"
   */
  app.get('/api/calculate', async(req, res) => {
    return await operationsController.calculate(req, res);
  });

};
