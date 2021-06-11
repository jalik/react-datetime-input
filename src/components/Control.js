/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import {
  bool,
  func,
  node,
} from 'prop-types';
import React from 'react';

function Control(props) {
  const {
    disabled,
    onClickMinus,
    onClickPlus,
    onClickValue,
    value,
  } = props;
  return (
    <div className="CalendarTime-Control">
      <button
        className="CalendarTime-Control-Plus"
        disabled={disabled}
        onClick={onClickPlus}
        type="button"
      >
        +
      </button>
      <button
        className="CalendarTime-Control-Value"
        disabled={disabled}
        onClick={onClickValue}
        type="button"
      >
        {value}
      </button>
      <button
        className="CalendarTime-Control-Minus"
        disabled={disabled}
        onClick={onClickMinus}
        type="button"
      >
        -
      </button>
    </div>
  );
}

Control.propTypes = {
  disabled: bool,
  onClickMinus: func.isRequired,
  onClickPlus: func.isRequired,
  onClickValue: func.isRequired,
  value: node.isRequired,
};

Control.defaultProps = {
  disabled: false,
};

export default Control;
