/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React, {
  useCallback,
  useMemo,
} from 'react';
import { ACTION_SET_MODE } from '../../calendarReducer';
import { CALENDAR_MODE_TIME } from '../../modes';
import { useCalendarContext } from '../CalendarProvider';

function TimeButton() {
  const {
    dispatch,
    state,
    toFormat,
  } = useCalendarContext();

  const dateTime = useMemo(() => (
    state.selectedDateTime || state.dateTime
  ), [state.dateTime, state.selectedDateTime]);

  const handleClickTime = useCallback(() => {
    dispatch({ type: ACTION_SET_MODE, data: { mode: CALENDAR_MODE_TIME } });
  }, [dispatch]);

  return (
    <button
      className="DateTimeInput-CalendarHeader-Time"
      onClick={handleClickTime}
      type="button"
    >
      {toFormat(dateTime, 'tt')}
    </button>
  );
}

export default TimeButton;
