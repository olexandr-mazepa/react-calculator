import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

const isOperator = val => {
  return !isNaN(val) || val === '.' || val === '=';
};

export const Button = props =>
  <div
    className={`button-wrapper ${
      isOperator(props.children) ? '' : 'operator'
    }`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired
};