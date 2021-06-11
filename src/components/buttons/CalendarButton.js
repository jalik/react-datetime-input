/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */
import {
  func,
  node,
} from 'prop-types';
import React from 'react';
import { stylesFromString } from '../../lib';

function CalendarButton(props) {
  const { icon, onClick, ...otherProps } = props;
  return (
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      className="CalendarButton"
      onClick={onClick}
      type="button"
    >
      {icon || (
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
              d="M 4,4 C 2.8919999,4 2,4.8919999 2,6 v 14 c 0,1.108 0.8919999,2 2,2 h 16 c 1.108,0 2,-0.892 2,-2 V 6 C 22,4.8919999 21.108,4 20,4 Z m 0,5 h 16 c 0.554,0 1,0.4460003 1,1 v 10 c 0,0.554 -0.446,1 -1,1 H 4 C 3.4460003,21 3,20.554 3,20 V 10 C 3,9.4460003 3.4460003,9 4,9 Z"
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
        </svg>
      )}
    </button>
  );
}

CalendarButton.propTypes = {
  icon: node,
  onClick: func.isRequired,
};

CalendarButton.defaultProps = {
  icon: null,
};

export default CalendarButton;
