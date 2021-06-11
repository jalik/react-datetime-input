/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React, { useCallback } from 'react';
import { ACTION_SET_MODE } from '../../calendarReducer';
import { CALENDAR_MODE_MONTH } from '../../modes';
import { useCalendarContext } from '../CalendarProvider';

function MonthButton() {
  const {
    dispatch,
    state,
    toFormat,
  } = useCalendarContext();

  const { dateTime } = state;

  const handleClick = useCallback(() => {
    dispatch({
      type: ACTION_SET_MODE,
      data: { mode: CALENDAR_MODE_MONTH },
    });
  }, [dispatch]);

  return (
    <button
      className="Calendar-MonthButton"
      onClick={handleClick}
      type="button"
    >
      {toFormat(dateTime, 'MMM')}
    </button>
  );
}

export default MonthButton;
