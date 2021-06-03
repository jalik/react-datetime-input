/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import {
  CALENDAR_MODE_DAY,
  CALENDAR_MODE_MONTH,
  CALENDAR_MODE_YEAR,
} from './modes';

export const ACTION_NEXT = 'NEXT';
export const ACTION_PREVIOUS = 'PREVIOUS';
export const ACTION_SELECT_DAY = 'SELECT_DAY';
export const ACTION_SELECT_MONTH = 'SELECT_MONTH';
export const ACTION_SELECT_YEAR = 'SELECT_YEAR';
export const ACTION_SET_DATETIME = 'SET_DATETIME';
export const ACTION_SET_MODE = 'SET_MODE';
export const ACTION_SET_SELECTED_DATETIME = 'SET_SELECTED_DATETIME';
export const ACTION_TODAY = 'TODAY';

function getNextActionState(state) {
  let { dateTime } = state;

  if (state.mode === CALENDAR_MODE_YEAR) {
    dateTime = state.dateTime.plus({ year: 10 });
  } else if (state.mode === CALENDAR_MODE_MONTH) {
    dateTime = state.dateTime.plus({ year: 1 });
  } else if (state.mode === CALENDAR_MODE_DAY) {
    dateTime = state.dateTime.plus({ month: 1 });
  }
  return { ...state, dateTime };
}

function getPreviousActionState(state) {
  let { dateTime } = state;

  if (state.mode === CALENDAR_MODE_YEAR) {
    dateTime = state.dateTime.minus({ year: 10 });
  } else if (state.mode === CALENDAR_MODE_MONTH) {
    dateTime = state.dateTime.minus({ year: 1 });
  } else if (state.mode === CALENDAR_MODE_DAY) {
    dateTime = state.dateTime.minus({ month: 1 });
  }
  return { ...state, dateTime };
}

function getSelectDayActionState(state, action) {
  const { day } = action.data;
  const date = {
    day: day.day,
    month: day.month,
    year: day.year,
    hour: state.dateTime.hour,
    minute: state.dateTime.minute,
    second: state.dateTime.second,
  };
  const selectedDateTime = state.selectedDateTime
    ? state.selectedDateTime.set(date) : null;
  const dateTime = selectedDateTime || state.dateTime.set(date);
  return {
    ...state,
    dateTime,
    selectedDateTime: dateTime,
  };
}

function getSelectMonthActionState(state, action) {
  const { data } = action;
  const selectedDateTime = state.selectedDateTime
    ? state.selectedDateTime.set({ month: data.month, year: state.dateTime.year }) : null;
  const dateTime = selectedDateTime || state.dateTime.set({ month: data.month });
  return {
    ...state,
    dateTime,
    mode: CALENDAR_MODE_DAY,
    selectedDateTime,
  };
}

function getSelectYearActionState(state, action) {
  const { data } = action;
  const selectedDateTime = state.selectedDateTime
    ? state.selectedDateTime.set({ year: data.year }) : null;
  const dateTime = selectedDateTime || state.dateTime.set({ year: data.year });
  return {
    ...state,
    dateTime,
    mode: CALENDAR_MODE_MONTH,
    selectedDateTime,
  };
}

function getSetSelectedDateTimeActionState(state, action) {
  const { data } = action;
  return {
    ...state,
    dateTime: data.selectedDateTime || data.dateTime,
    selectedDateTime: data.selectedDateTime,
  };
}

function calendarReducer(state, action) {
  const { type, data } = action;

  if (type === ACTION_NEXT) {
    return getNextActionState(state);
  }
  if (type === ACTION_PREVIOUS) {
    return getPreviousActionState(state);
  }
  if (type === ACTION_SELECT_DAY) {
    return getSelectDayActionState(state, action);
  }
  if (type === ACTION_SELECT_MONTH) {
    return getSelectMonthActionState(state, action);
  }
  if (type === ACTION_SELECT_YEAR) {
    return getSelectYearActionState(state, action);
  }
  if (type === ACTION_SET_DATETIME) {
    return { ...state, dateTime: data.dateTime };
  }
  if (type === ACTION_SET_SELECTED_DATETIME) {
    return getSetSelectedDateTimeActionState(state, action);
  }
  if (type === ACTION_SET_MODE) {
    return { ...state, mode: data.mode };
  }
  if (type === ACTION_TODAY) {
    const dateTime = DateTime.now().setLocale(state.dateTime.locale);
    return { ...state, dateTime };
  }
  throw new Error(`Unsupported action type "${type}"`);
}

export default calendarReducer;
