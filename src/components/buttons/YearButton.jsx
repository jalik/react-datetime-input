/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React, { useCallback } from 'react';
import { ACTION_SET_MODE } from '../../calendarReducer';
import { CALENDAR_MODE_YEAR } from '../../modes';
import { useCalendarContext } from '../CalendarProvider';

function YearButton() {
  const { numberFormatter, state, dispatch } = useCalendarContext();
  const { dateTime } = state;

  const handleClickYear = useCallback(() => {
    dispatch({ type: ACTION_SET_MODE, data: { mode: CALENDAR_MODE_YEAR } });
  }, [dispatch]);

  return (
    <button
      className="DateTimeInput-CalendarHeader-Year"
      onClick={handleClickYear}
      type="button"
    >
      {numberFormatter.format(dateTime.year)}
    </button>
  );
}

export default YearButton;
