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

  describe('Add method', () => {
    const resMock = {
      invalidRequest: sinon.stub(),
      send: sinon.stub(),
      status: sinon.stub(),
      serverError: sinon.stub()
    };

    it('should validate req query', () => {
      operatorsController.add({ query: {} }, resMock);
      expect(resMock.invalidRequest.firstCall.args[0]).to.deep.equal([
        'A required query parameter \'firstOperand\' was not specified for this request',
        'A required query parameter \'secondOperand\' was not specified for this request'
      ]);
    });

    it('should call send with correct status if operation is done', () => {

      const serviceResult = {
        firstOperand: '2',
        secondOperand: '2',
        operation: 'plus',
        result: '4'
      };

      calcServiceMock.doOperation.returns(serviceResult);
      resMock.send.returns({});
      resMock.status.returnsThis();

      operatorsController.add({
        query: {
          firstOperand: '2',
          secondOperand: '2'
        }
      }, resMock);

      expect(resMock.status.firstCall.args[0]).to.equal(200);
      expect(resMock.send.firstCall.args[0]).to.include({
        firstOperand: '2',
        secondOperand: '2',
        operation: 'plus',
        result: '4'
      });
    });

    it('should call serverError if something went wrong', () => {


      calcServiceMock.doOperation.throws('err', 'something went wrong');

      operatorsController.add({
        query: {
          firstOperand: '2',
          secondOperand: '2'
        }
      }, resMock);

      expect(resMock.serverError.firstCall.args[0]).to.have.property('message').to.be.equal('something went wrong');
    });

  });

  describe('Subtract method', () => {
    const resMock = {
      invalidRequest: sinon.stub(),
      send: sinon.stub(),
      status: sinon.stub(),
      serverError: sinon.stub()
    };

    it('should validate req query', () => {
      operatorsController.subtract({ query: {} }, resMock);
      expect(resMock.invalidRequest.firstCall.args[0]).to.deep.equal([
        'A required query parameter \'firstOperand\' was not specified for this request',
        'A required query parameter \'secondOperand\' was not specified for this request'
      ]);
    });

    it('should call send with correct status if operation is done', () => {

      const serviceResult = {
        firstOperand: '1',
        secondOperand: '1',
        operation: 'subtract',
        result: '0'
      };

      calcServiceMock.doOperation.returns(serviceResult);
      resMock.send.returns({});
      resMock.status.returnsThis();

      operatorsController.subtract({
        query: {
          firstOperand: '1',
          secondOperand: '1'
        }
      }, resMock);

      expect(resMock.status.firstCall.args[0]).to.equal(200);
      expect(resMock.send.firstCall.args[0]).to.include(serviceResult);
    });

    it('should call serverError if something went wrong', () => {


      calcServiceMock.doOperation.throws('err', 'something went wrong');

      operatorsController.subtract({
        query: {
          firstOperand: '1',
          secondOperand: '1'
        }
      }, resMock);

      expect(resMock.serverError.firstCall.args[0]).to.have.property('message').to.be.equal('something went wrong');
    });

  });


  describe('Multiply method', () => {
    const resMock = {
      invalidRequest: sinon.stub(),
      send: sinon.stub(),
      status: sinon.stub(),
      serverError: sinon.stub()
    };

    it('should validate req query', () => {
      operatorsController.multiply({ query: {} }, resMock);
      expect(resMock.invalidRequest.firstCall.args[0]).to.deep.equal([
        'A required query parameter \'firstOperand\' was not specified for this request',
        'A required query parameter \'secondOperand\' was not specified for this request'
      ]);
    });

    it('should call send with correct status if operation is done', () => {

      const serviceResult = {
        firstOperand: '2',
        secondOperand: '2',
        operation: 'plus',
        result: '4'
      };

      calcServiceMock.doOperation.returns(serviceResult);
      resMock.send.returns({});
      resMock.status.returnsThis();

      operatorsController.multiply({
        query: {
          firstOperand: '2',
          secondOperand: '2'
        }
      }, resMock);

      expect(resMock.status.firstCall.args[0]).to.equal(200);
      expect(resMock.send.firstCall.args[0]).to.include(serviceResult);
    });

    it('should call serverError if something went wrong', () => {


      calcServiceMock.doOperation.throws('err', 'something went wrong');

      operatorsController.multiply({
        query: {
          firstOperand: '2',
          secondOperand: '2'
        }
      }, resMock);

      expect(resMock.serverError.firstCall.args[0]).to.have.property('message').to.be.equal('something went wrong');
    });

  });

  describe('Divide method', () => {
    const resMock = {
      invalidRequest: sinon.stub(),
      send: sinon.stub(),
      status: sinon.stub(),
      serverError: sinon.stub()
    };

    it('should validate req query', () => {
      operatorsController.divide({ query: {} }, resMock);
      expect(resMock.invalidRequest.firstCall.args[0]).to.deep.equal([
        'A required query parameter \'firstOperand\' was not specified for this request',
        'A required query parameter \'secondOperand\' was not specified for this request'
      ]);
    });

    it('should call send with correct status if operation is done', () => {

      const serviceResult = {
        firstOperand: '2',
        secondOperand: '2',
        operation: 'divide',
        result: '1'
      };

      calcServiceMock.doOperation.returns(serviceResult);
      resMock.send.returns({});
      resMock.status.returnsThis();

      operatorsController.divide({
        query: {
          firstOperand: '2',
          secondOperand: '2'
        }
      }, resMock);

      expect(resMock.status.firstCall.args[0]).to.equal(200);
      expect(resMock.send.firstCall.args[0]).to.include(serviceResult);
    });

    it('should call serverError if something went wrong', () => {


      calcServiceMock.doOperation.throws('err', 'something went wrong');

      operatorsController.divide({
        query: {
          firstOperand: '2',
          secondOperand: '2'
        }
      }, resMock);

      expect(resMock.serverError.firstCall.args[0]).to.have.property('message').to.be.equal('something went wrong');
    });

  });
});
