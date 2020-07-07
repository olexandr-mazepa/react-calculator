import React from 'react';
import './DisplayPart.css';
import PropTypes from 'prop-types';

export const DisplayPart = props => <div data-testid={props['data-testid']} className='display-part'>{props.text}</div>;

DisplayPart.propTypes = {
  'data-testid': PropTypes.node.isRequired,
  text: PropTypes.node.isRequired
};