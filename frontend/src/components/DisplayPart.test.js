import React from 'react';
import ReactDom from 'react-dom';
import { DisplayPart } from './DisplayPart';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('should render display component without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<DisplayPart data-testid='test-display' text="test"></DisplayPart>, div);
  const renderedComp = div.querySelector('div');
  expect(renderedComp.textContent).toBe('test');
});

it('should have correct class', () => {
  const { getByText } = render(<DisplayPart data-testid='test-display' text={'Test text'}></DisplayPart>);
  expect(getByText('Test text')).toHaveClass('display-part');
});
