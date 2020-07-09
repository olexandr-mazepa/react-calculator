const { it, describe, beforeEach } = require('mocha');
const expect = require('chai').expect;
const sinon = require('sinon');
const OperatorsController = require('../../controllers/operations');

describe('Controllers:operations', () => {
  let operatorsController;
  let calcServiceMock;

  beforeEach(() => {
    calcServiceMock = {
      doOperation: sinon.stub()
    };
    operatorsController = new OperatorsController(calcServiceMock);
  });

  describe('calculate method', () => {
    const resMock = {
      invalidRequest: sinon.stub(),
      send: sinon.stub(),
      status: sinon.stub(),
      serverError: sinon.stub()
    };

    describe('should validate req query', () => {

      beforeEach(()=>{
        resMock.invalidRequest.reset();
      });

      it('should check that firstOperand exists', () => {
        operatorsController.calculate({ query: {} }, resMock);
        expect(resMock.invalidRequest.firstCall.args[0]).to.be.equal('A required query parameter \'firstOperand\' was not specified for this request');
      });

      it('should check that secondOperand exists', () => {
        operatorsController.calculate({ query: { firstOperand: '1' } }, resMock);
        expect(resMock.invalidRequest.firstCall.args[0]).to.be.equal('A required query parameter \'secondOperand\' was not specified for this request');
      });

      it('should check that operator exists', () => {
        operatorsController.calculate({ query: { firstOperand: '1', secondOperand: '0' } }, resMock);
        expect(resMock.invalidRequest.firstCall.args[0]).to.be.equal('A required query parameter \'operator\' was not specified for this request');
      });

      it('should check that operator is allowed', () => {
        operatorsController.calculate({ query: { firstOperand: '1', secondOperand: '0', operator: 'log' } }, resMock);
        expect(resMock.invalidRequest.firstCall.args[0]).to.be.equal('Unknown operator \'log\'');
      });

    });


    it('should call send with correct status if operation is done', () => {

      const serviceResult = {
        firstOperand: '2',
        secondOperand: '2',
        operation: '+',
        result: '4'
      };

      calcServiceMock.doOperation.returns(serviceResult);
      resMock.send.returns({});
      resMock.status.returnsThis();

      operatorsController.calculate({
        query: {
          firstOperand: '2',
          secondOperand: '2',
          operator: '+'
        }
      }, resMock);

      expect(resMock.status.firstCall.args[0]).to.equal(200);
      expect(resMock.send.firstCall.args[0]).to.include({
        firstOperand: '2',
        secondOperand: '2',
        operation: '+',
        result: '4'
      });
    });

    it('should call serverError if something went wrong', () => {

      calcServiceMock.doOperation.throws('err', 'something went wrong');
      operatorsController.calculate({
        query: {
          firstOperand: '2',
          secondOperand: '2',
          operator: '+'
        }
      }, resMock);


      expect(resMock.serverError.firstCall.args[0]).to.have.property('message').to.be.equal('something went wrong');
    });

  });

});
