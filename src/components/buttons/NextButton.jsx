/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React, { useCallback } from 'react';
import { ACTION_NEXT } from '../../calendarReducer';
import { stylesFromString } from '../../lib';
import { useCalendarContext } from '../CalendarProvider';

function NextButton() {
  const { dispatch } = useCalendarContext();

  const handleClickNext = useCallback(() => {
    dispatch({ type: ACTION_NEXT });
  }, [dispatch]);

  return (
    <button
      className="Calendar-NextButton"
      onClick={handleClickNext}
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
          style={stylesFromString('fill:#010101;fillOpacity:1;strokeWidth:0.264583')}
          d="m 2.1071447,0.83639169 c 0.103647,-0.10364701 0.2705303,-0.10364703 0.3741773,0 L 4.5392974,2.894367 c 0.103647,0.1036469 0.1036471,0.2705303 0,0.3741774 l -2.245064,2.245064 c -0.103647,0.103647 -0.2705305,0.103647 -0.3741774,0 L 1.7329673,5.3265198 3.9780315,3.0814556 1.920056,1.0234802 Z"
        />
      </svg>
    </button>
  );
}

export default NextButton;
