import React from 'react';
import './ClearButton.css';
import PropTypes from 'prop-types';

export const ClearButton = props => (
  <div className="clear-btn" onClick={props.handleClear}>
    {props.children}
  </div>
);

ClearButton.propTypes = {
  children: PropTypes.node.isRequired,
  handleClear: PropTypes.func.isRequired
};