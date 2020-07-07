import React from 'react';
import ReactDom from 'react-dom';
import { ClearButton } from './ClearButton';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('should render clear button component', () => {
  const div = document.createElement('div');
  const handler = jest.fn();
  ReactDom.render(<ClearButton handleClear={handler}>Test text</ClearButton>, div);
  const renderedComp = div.querySelector('div');
  expect(renderedComp.textContent).toBe('Test text');
});

it('should have correct class', () => {
  const handler = jest.fn();
  const { getByText } = render(<ClearButton handleClear={handler}>Test text</ClearButton>);
  expect(getByText('Test text')).toHaveClass('clear-btn');
});

it('should call handler function with correct argument value', () => {
  const handler = jest.fn();
  const { getByText } = render(<ClearButton handleClear={handler}>Test text</ClearButton>);
  fireEvent.click(getByText('Test text'));
  expect(handler).toHaveBeenCalled();
});