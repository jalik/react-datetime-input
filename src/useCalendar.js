/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import {
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import calendarReducer from './calendarReducer';

function useCalendar(props) {
  const {
    date,
    locale,
    selectedDate,
    view,
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
    selectedDateTime,
    view,
  };

  const numberFormatter = useMemo(() => (
    new Intl.NumberFormat(locale, { useGrouping: false })
  ), [locale]);

  const toFormat = useCallback((datetime, ...format) => (
    datetime.setLocale(locale).toFormat(...format)
  ), [locale]);

  const [state, dispatch] = useReducer(calendarReducer, initialState, undefined);
  return useMemo(() => ({
    dispatch,
    locale,
    numberFormatter,
    state,
    toFormat,
  }), [locale, numberFormatter, state, toFormat]);
}

export default useCalendar;
