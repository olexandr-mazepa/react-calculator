import React, { useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { DisplayPart } from './components/DisplayPart';
import { ClearButton } from './components/ClearButton';
import CalculationService from "./services/calc";

function App() {
  const [input, updateInput] = useState('');
  const [previous, updatePrevious] = useState('');
  const [operator, updateOperator] = useState('');
  const [err, updateErr] = useState('');

  const addCharacter = val => {
    const newValue = input + val;
    updateInput(newValue);
  };

  const handleOperatorClick = val => {
    if (input && !operator) {
      updatePrevious(input);
      updateInput('');
      updateOperator(val);
    }
  };

  const addZero = val =>{
    if(input !== ''){
      addCharacter(val);
    }
  };

  const addDecimal =val => {
    if (input.indexOf(val) === -1) {
      addCharacter(val);
    }
  };

  const handleClear = () => {
    updateInput('');
    updatePrevious('');
    updateOperator('');
    updateErr('')
  };

  const handleBackspace = () => {
    const currentValue = input || '';
    updateInput(currentValue.slice(0, -1));
  };

  const handleEqual = async () => {
    if (operator && previous && input) {
      try {
        const calculationRes = await CalculationService.calculate(operator, previous, input);
        updateInput(calculationRes.toString());
        updatePrevious('');
        updateOperator('');
        updateErr('')
      } catch (error) {
        updateErr(error.message);
      }

    }
  };

  return (
    <div className="app">
      <div className="calc-wrapper">
        {
          err !== '' &&
          <div className="row">
            <div className='status-line'>{err}</div>
          </div>
        }

        <div className='display' >
          <DisplayPart data-testid="display2" text={previous}></DisplayPart>
          <DisplayPart data-testid="display1" text={operator}></DisplayPart>
          <DisplayPart data-testid="display" text={input}></DisplayPart>
        </div>

        <div className="row">
          <Button handleClick={addCharacter}>7</Button>
          <Button handleClick={addCharacter}>8</Button>
          <Button handleClick={addCharacter}>9</Button>
          <Button handleClick={handleOperatorClick}>/</Button>
        </div>

        <div className="row">
          <Button handleClick={addCharacter}>4</Button>
          <Button handleClick={addCharacter}>5</Button>
          <Button handleClick={addCharacter}>6</Button>
          <Button handleClick={handleOperatorClick}>*</Button>
        </div>

        <div className="row">
          <Button handleClick={addCharacter}>1</Button>
          <Button handleClick={addCharacter}>2</Button>
          <Button handleClick={addCharacter}>3</Button>
          <Button handleClick={handleOperatorClick}>+</Button>
        </div>

        <div className="row">
          <Button handleClick={addDecimal}>.</Button>
          <Button handleClick={addZero}>0</Button>
          <Button handleClick={handleEqual}>=</Button>
          <Button handleClick={handleOperatorClick}>-</Button>
        </div>

        <div className="row">
          <ClearButton handleClear={handleClear}>AC</ClearButton>
          <ClearButton handleClear={handleBackspace}>CE</ClearButton>
        </div>

      </div>
    </div>
  );
}

export default App;
