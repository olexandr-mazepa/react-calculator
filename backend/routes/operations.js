const OperationsController = require('../controllers/operations');
const CalcService = require('../services/calc');
const operationsController = new OperationsController(new CalcService());

module.exports.init = app => {

  /**
   * @swagger
   * /api/operations/plus:
   *   get:
   *     description: calculates the sum of two digits
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
   *     responses:
   *       200:
   *         $ref: "#/definitions/CalculationResponse"
   *       400:
   *         $ref: "#/responses/Error400"
   *       500:
   *         $ref: "#/responses/Error500"
   */
  app.get('/api/operations/plus', async(req, res) => {
    return await operationsController.add(req, res);
  });

  /**
   * @swagger
   * /api/operations/subtract:
   *   get:
   *     description: calculates the difference of two digits
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
   *     responses:
   *       200:
   *         $ref: "#/definitions/CalculationResponse"
   *       400:
   *         $ref: "#/responses/Error400"
   *       500:
   *         $ref: "#/responses/Error500"
   */
  app.get('/api/operations/subtract', async(req, res) => {
    return await operationsController.subtract(req, res);
  });

  /**
   * @swagger
   * /api/operations/multiply:
   *   get:
   *     description: multiplies two digits
   *     security:
   *       - UserSecurity: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: firstOperand
   *         in: query
   *         type: string
   *       - name: secondOperand
   *         in: query
   *         type: string
   *     tags:
   *       - Operations
   *     responses:
   *       200:
   *         $ref: "#/definitions/CalculationResponse"
   *       400:
   *         $ref: "#/responses/Error400"
   *       500:
   *         $ref: "#/responses/Error500"
   */
  app.get('/api/operations/multiply', async(req, res) => {
    return await operationsController.multiply(req, res);
  });

  /**
   * @swagger
   * /api/operations/divide:
   *   get:
   *     description: divides two digits
   *     security:
   *       - UserSecurity: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: firstOperand
   *         in: query
   *         type: string
   *       - name: secondOperand
   *         in: query
   *         type: string
   *     tags:
   *       - Operations
   *     responses:
   *       200:
   *         $ref: "#/definitions/CalculationResponse"
   *       400:
   *         $ref: "#/responses/Error400"
   *       500:
   *         $ref: "#/responses/Error500"
   */
  app.get('/api/operations/divide', async(req, res) => {
    return await operationsController.divide(req, res);
  });

};
