import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { render, cleanup, fireEvent } from '@testing-library/react';

it('should render App component', () => {
  const div = document.createElement('div');
  ReactDom.render(<App />, div);
});

it('should add number to display', () =>{
  const { getByText, getByTestId } = render(<App></App>);
  fireEvent.click(getByText('1'));
  expect(getByTestId('display')).toHaveTextContent('1');
})

describe('Operation buttons',() =>{
  it('should update additional displays on click', () => {
    const { getByText, getByTestId } = render(<App></App>);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('2'));
    expect(getByTestId('display')).toHaveTextContent('12');
    fireEvent.click(getByText('+'));
    expect(getByTestId('display2')).toHaveTextContent('12');
    expect(getByTestId('display1')).toHaveTextContent('+');
    expect(getByTestId('display')).toHaveTextContent('');
  })

})

describe('Zero button',() =>{
  it('should add a zero if input is not empty', () => {
    const { getByText, getByTestId } = render(<App></App>);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('0'));
    expect(getByTestId('display')).toHaveTextContent('10');
  })

  it('should not add a zero if input is empty', () => {
    const { getByText, getByTestId } = render(<App></App>);
    fireEvent.click(getByText('0'));
    expect(getByTestId('display')).toHaveTextContent('');
  })

})

describe('Decimal point button',() =>{
  it('should add a decimal point if input doesn\'t contain a decimal point', () => {
    const { getByText, getByTestId } = render(<App></App>);
    fireEvent.click(getByText('.'));
    expect(getByTestId('display')).toHaveTextContent('.');
  })

  it('should not add a decimal point if input contains other decimal point', () => {
    const { queryAllByText, getByText, getByTestId } = render(<App></App>);
    fireEvent.click(getByText('.'));
    fireEvent.click(queryAllByText('.')[1]);
    expect(getByTestId('display')).toHaveTextContent('.');
  })
})

describe('Clear button',() =>{
  it('should clear all displays', () => {
    const { getByText, getByTestId } = render(<App></App>);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('AC'));
    expect(getByTestId('display')).toHaveTextContent('');
    expect(getByTestId('display1')).toHaveTextContent('');
    expect(getByTestId('display2')).toHaveTextContent('');
  })
})

describe('Backspace button',() =>{
  it('should remove last character on input display', () => {
    const { getByText, getByTestId } = render(<App></App>);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('2'));
    expect(getByTestId('display')).toHaveTextContent('12');
    fireEvent.click(getByText('CE'));
    expect(getByTestId('display')).toHaveTextContent('1');
  })

  it('should not fail if input is empty', () => {
    const { getByText, getByTestId } = render(<App></App>);
    fireEvent.click(getByText('CE'));
    expect(getByTestId('display')).toHaveTextContent('');
  })
})


afterEach(cleanup)