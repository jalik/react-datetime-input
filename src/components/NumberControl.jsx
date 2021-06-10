/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import {
  func,
  node,
} from 'prop-types';
import React from 'react';

function NumberControl(props) {
  const { onClickMinus, onClickPlus, value } = props;
  return (
    <div className="DateTimeInput-CalendarTime-Control">
      <button
        className="DateTimeInput-CalendarTime-Control-Plus"
        onClick={onClickPlus}
        type="button"
      >
        +
      </button>
      <button
        className="DateTimeInput-CalendarTime-Control-Value"
        disabled
        type="button"
      >
        {value}
      </button>
      <button
        className="DateTimeInput-CalendarTime-Control-Minus"
        onClick={onClickMinus}
        type="button"
      >
        -
      </button>
    </div>
  );
}

NumberControl.propTypes = {
  onClickMinus: func.isRequired,
  onClickPlus: func.isRequired,
  value: node.isRequired,
};

export default NumberControl;
