/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React, {
  useCallback,
  useMemo,
} from 'react';
import { ACTION_SET_VIEW } from '../../calendarReducer';
import { CALENDAR_VIEW_DAY } from '../../calendarViews';
import { useCalendarContext } from '../CalendarProvider';

function DateButton() {
  const {
    dispatch,
    state,
    toFormat,
  } = useCalendarContext();

  const dateTime = useMemo(() => (
    state.selectedDateTime || state.dateTime
  ), [state.dateTime, state.selectedDateTime]);

  const handleClick = useCallback(() => {
    dispatch({
      type: ACTION_SET_VIEW,
      data: { view: CALENDAR_VIEW_DAY },
    });
  }, [dispatch]);

  return (
    <button
      className="Calendar-DateButton"
      onClick={handleClick}
      type="button"
    >
      {toFormat(dateTime, 'DD')}
    </button>
  );
}

export default DateButton;
