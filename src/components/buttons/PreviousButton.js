/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React, { useCallback } from 'react';
import { ACTION_PREVIOUS } from '../../calendarReducer';
import { stylesFromString } from '../../lib';
import { useCalendarContext } from '../CalendarProvider';

function PreviousButton() {
  const { dispatch } = useCalendarContext();

  const handleClick = useCallback(() => {
    dispatch({ type: ACTION_PREVIOUS });
  }, [dispatch]);

  return (
    <button
      className="Calendar-PreviousButton"
      onClick={handleClick}
      type="button"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 6.3499999 6.3500002"
        version="1.1"
        id="svg5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs
          id="defs2"
        />
        <path
          id="rect1055"
          style={stylesFromString('fill:#010101;strokeWidth:0.264583;fillOpacity:1')}
          d="m 4.2428553,0.83639169 c -0.103647,-0.10364701 -0.2705303,-0.10364703 -0.3741773,0 L 1.8107026,2.894367 c -0.103647,0.1036469 -0.1036471,0.2705303 0,0.3741774 l 2.245064,2.245064 c 0.103647,0.103647 0.2705305,0.103647 0.3741774,0 L 4.6170327,5.3265198 2.3719685,3.0814556 4.429944,1.0234802 Z"
        />
      </svg>
    </button>
  );
}

export default PreviousButton;
