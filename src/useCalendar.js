/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import {
  useMemo,
  useReducer,
} from 'react';
import calendarReducer from './calendarReducer';

function useCalendar(props) {
  const {
    date,
    locale,
    mode,
    selectedDate,
  } = props;

  const dateTime = useMemo(() => (
    date
      ? DateTime.fromISO(date, { locale })
      // Use current date as default.
      : DateTime.now().set({ millisecond: 0 }).setLocale(locale)
  ), [date, locale]);

  const selectedDateTime = useMemo(() => (
    selectedDate
      ? DateTime.fromISO(selectedDate, { locale })
      : null
  ), [locale, selectedDate]);

  const initialState = {
    dateTime,
    mode,
    selectedDateTime,
  };

  const numberFormatter = useMemo(() => (
    new Intl.NumberFormat(locale, { useGrouping: false })
  ), [locale]);

  const [state, dispatch] = useReducer(calendarReducer, initialState, undefined);
  return useMemo(() => ({
    dispatch,
    locale,
    numberFormatter,
    state,
  }), [locale, numberFormatter, state]);
}

export default useCalendar;
