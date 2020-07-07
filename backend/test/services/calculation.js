const { it, describe, before } = require('mocha');
const expect = require('chai').expect;

const CalculationService = require('../../services/calc');

describe('Services:calculation', () => {
  let calculationService;

  before(() => {
    calculationService = new CalculationService();
  });

  describe('Default operations', () =>{
    it('Should add two numbers', () => {
      const res = calculationService.doOperation('1', '1', 'plus');
      expect(res).to.include({
        firstOperand: '1',
        secondOperand: '1',
        operation: 'plus',
        result: '2'
      });
    });

    it('Should multiply two numbers', () => {
      const res = calculationService.doOperation('2', '2', 'multiply');
      expect(res).to.include({
        firstOperand: '2',
        secondOperand: '2',
        operation: 'multiply',
        result: '4'
      });
    });

    it('Should subtract the second number from the first number', () => {
      const res = calculationService.doOperation('2', '1', 'subtract');
      expect(res).to.include({
        firstOperand: '2',
        secondOperand: '1',
        operation: 'subtract',
        result: '1'
      });
    });

    it('Should correctly divide the first number on the second', () => {
      const res = calculationService.doOperation('6', '2', 'divide');
      expect(res).to.include({
        firstOperand: '6',
        secondOperand: '2',
        operation: 'divide',
        result: '3'
      });
    });
  });

  describe('Rounding decimal numbers', () => {
    it('Should correctly round after adding two decimal numbers', () => {
      const res = calculationService.doOperation('0.1', '0.2', 'plus');
      expect(res).to.include({
        firstOperand: '0.1',
        secondOperand: '0.2',
        operation: 'plus',
        result: '0.3'
      });
    });

    it('Should correctly multiply big numbers', () => {
      const res = calculationService.doOperation('99999999999999999999', '1', 'multiply');
      expect(res).to.include({
        firstOperand: '99999999999999999999',
        secondOperand: '1',
        operation: 'multiply',
        result: '99999999999999999999'
      });
    });

    it('Should correctly round after multiply two decimal numbers', () => {
      const res = calculationService.doOperation('0.1', '0.2', 'multiply');
      expect(res).to.include({
        firstOperand: '0.1',
        secondOperand: '0.2',
        operation: 'multiply',
        result: '0.02'
      });
    });
  });

  describe('Exponential number format ', () => {
    it('Should add two numbers in exponential format', () => {
      const res = calculationService.doOperation('1e+21', '1e+21', 'plus');
      expect(res).to.include({
        firstOperand: '1e+21',
        secondOperand: '1e+21',
        operation: 'plus',
        result: '2e+21'
      });
    });

    it('Should multiply two numbers in exponential format', () => {
      const res = calculationService.doOperation('1e+21', '2', 'multiply');
      expect(res).to.include({
        firstOperand: '1e+21',
        secondOperand: '2',
        operation: 'multiply',
        result: '2e+21'
      });
    });

    it('Should subtract the second number from the first number in exponential format', () => {
      const res = calculationService.doOperation('2e+21', '1e+21', 'subtract');
      expect(res).to.include({
        firstOperand: '2e+21',
        secondOperand: '1e+21',
        operation: 'subtract',
        result: '1e+21'
      });
    });

    it('Should correctly divide the first number on the second in exponential format', () => {
      const res = calculationService.doOperation('2e+21', '2', 'divide');
      expect(res).to.include({
        firstOperand: '2e+21',
        secondOperand: '2',
        operation: 'divide',
        result: '1e+21'
      });
    });
  });
});
