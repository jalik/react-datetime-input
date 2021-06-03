/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React, { useCallback } from 'react';
import { ACTION_TODAY } from '../../calendarReducer';
import { stylesFromString } from '../../lib';
import { useCalendarContext } from '../CalendarProvider';

function TodayButton() {
  const { dispatch } = useCalendarContext();

  const handleClickToday = useCallback(() => {
    dispatch({ type: ACTION_TODAY });
  }, [dispatch]);

  return (
    <button
      className="DateTimeInput-Calendar-TodayButton"
      onClick={handleClickToday}
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
        <g
          id="layer1"
        >
          <path
            id="rect873"
            style={stylesFromString('fill:#000000;fillOpacity:1;fillRule:evenodd;strokeWidth:0.999999')}
            d="M 4 4 C 2.8919999 4 2 4.8919999 2 6 L 2 20 C 2 21.108 2.8919999 22 4 22 L 20 22 C 21.108 22 22 21.108 22 20 L 22 6 C 22 4.8919999 21.108 4 20 4 L 4 4 z M 4 9 L 20 9 C 20.554 9 21 9.4460003 21 10 L 21 20 C 21 20.554 20.554 21 20 21 L 4 21 C 3.4460003 21 3 20.554 3 20 L 3 10 C 3 9.4460003 3.4460003 9 4 9 z "
            transform="scale(0.26458334)"
          />
          <rect
            style={stylesFromString('fill:#000000;fillOpacity:1;strokeWidth:0.264583')}
            id="rect1511"
            width="0.5291667"
            height="0.79375005"
            x="1.3229166"
            y="0.52916664"
            ry="0.26458332"
          />
          <rect
            style={stylesFromString('fill:#000000;fillOpacity:1;strokeWidth:0.264583')}
            id="rect1511-3"
            width="0.5291667"
            height="0.79375005"
            x="4.4979167"
            y="0.52916658"
            ry="0.26458332"
          />
        </g>
        <rect
          style={stylesFromString('fill:#000000;fillOpacity:1;strokeWidth:0.264583')}
          id="rect850"
          width="0.79375011"
          height="0.79375005"
          x="1.3229166"
          y="2.9104166"
          ry="0.26458335"
        />
      </svg>
    </button>
  );
}

export default TodayButton;
