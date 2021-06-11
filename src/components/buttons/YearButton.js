/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React, { useCallback } from 'react';
import { ACTION_SET_VIEW } from '../../calendarReducer';
import { CALENDAR_VIEW_YEAR } from '../../calendarViews';
import { useCalendarContext } from '../CalendarProvider';

function YearButton() {
  const { dispatch, state, toFormat } = useCalendarContext();
  const { dateTime } = state;

  const handleClick = useCallback(() => {
    dispatch({
      type: ACTION_SET_VIEW,
      data: { view: CALENDAR_VIEW_YEAR },
    });
  }, [dispatch]);

  return (
    <button
      className="Calendar-YearButton"
      onClick={handleClick}
      type="button"
    >
      {toFormat(dateTime, 'yyyy')}
    </button>
  );
}

export default YearButton;
