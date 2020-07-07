import React from 'react';
import ReactDom from 'react-dom';
import { Button } from './Button';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('should render Button component without crashing', () => {
  const div = document.createElement('div');
  const handler =jest.fn();
  ReactDom.render(<Button handleClick={handler}>test</Button>, div);
  const renderedComp = div.querySelector('div');
  expect(renderedComp.textContent).toBe('test');
});

it('should have correct class for simple button', () => {
  const handler =jest.fn();
  const { getByText } = render(<Button handleClick={handler}>1</Button>);
  expect(getByText('1')).toHaveClass('button-wrapper');
});

it('should have correct classes for operator button', () => {
  const handler =jest.fn();
  const { getByText } = render(<Button handleClick={handler}>*</Button>);
  expect(getByText('*')).toHaveClass('button-wrapper');
  expect(getByText('*')).toHaveClass('operator');
});

it('should call handler function with correct argument value', () => {
  const handler = jest.fn();
  const { getByText } = render(<Button handleClick={handler}>1</Button>);
  fireEvent.click(getByText('1'));
  expect(handler).toHaveBeenCalledWith('1');
});