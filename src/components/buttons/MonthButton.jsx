/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React, {
  useCallback,
  useMemo,
} from 'react';
import { ACTION_SET_MODE } from '../../calendarReducer';
import { CALENDAR_MODE_MONTH } from '../../modes';
import { useCalendarContext } from '../CalendarProvider';

function MonthButton() {
  const { state, dispatch, locale } = useCalendarContext();
  const { dateTime } = state;

  const month = useMemo(() => (
    dateTime.setLocale(locale).toFormat('MMM')
  ), [dateTime, locale]);

  const handleClickMonth = useCallback(() => {
    dispatch({ type: ACTION_SET_MODE, data: { mode: CALENDAR_MODE_MONTH } });
  }, [dispatch]);

  return (
    <button
      className="DateTimeInput-CalendarHeader-Month"
      onClick={handleClickMonth}
      type="button"
    >
      {month}
    </button>
  );
}

export default MonthButton;
