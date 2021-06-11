/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import {
  CALENDAR_VIEW_DAY,
  CALENDAR_VIEW_MONTH,
  CALENDAR_VIEW_TIME,
  CALENDAR_VIEW_YEAR,
} from './calendarViews';

export const ACTION_NEXT = 'NEXT';
export const ACTION_PREVIOUS = 'PREVIOUS';
export const ACTION_SELECT_DAY = 'SELECT_DAY';
export const ACTION_SELECT_HOUR = 'SELECT_HOUR';
export const ACTION_SELECT_MINUTE = 'SELECT_MINUTE';
export const ACTION_SELECT_MONTH = 'SELECT_MONTH';
export const ACTION_SELECT_SECOND = 'SELECT_SECOND';
export const ACTION_SELECT_YEAR = 'SELECT_YEAR';
export const ACTION_SET_DATETIME = 'SET_DATETIME';
export const ACTION_SET_SELECTED_DATETIME = 'SET_SELECTED_DATETIME';
export const ACTION_SET_VIEW = 'SET_VIEW';
export const ACTION_TODAY = 'TODAY';

function getNextActionState(state) {
  let { dateTime } = state;

  if (state.view === CALENDAR_VIEW_YEAR) {
    dateTime = state.dateTime.plus({ year: 10 });
  } else if (state.view === CALENDAR_VIEW_MONTH) {
    dateTime = state.dateTime.plus({ year: 1 });
  } else if (state.view === CALENDAR_VIEW_DAY) {
    dateTime = state.dateTime.plus({ month: 1 });
  }
  return { ...state, dateTime };
}

function getPreviousActionState(state) {
  let { dateTime } = state;

  if (state.view === CALENDAR_VIEW_YEAR) {
    dateTime = state.dateTime.minus({ year: 10 });
  } else if (state.view === CALENDAR_VIEW_MONTH) {
    dateTime = state.dateTime.minus({ year: 1 });
  } else if (state.view === CALENDAR_VIEW_DAY) {
    dateTime = state.dateTime.minus({ month: 1 });
  }
  return { ...state, dateTime };
}

function getSelectDayActionState(state, action) {
  const { day } = action.data;
  return {
    ...state,
    dateTime: day,
    selectedDateTime: day,
  };
}

function getSelectHourActionState(state, action) {
  const { hour } = action.data;
  const datetime = (state.selectedDateTime || state.dateTime).set({ hour });
  return {
    ...state,
    dateTime: datetime,
    selectedDateTime: datetime,
    view: CALENDAR_VIEW_TIME,
  };
}

function getSelectMinuteActionState(state, action) {
  const { minute } = action.data;
  const datetime = (state.selectedDateTime || state.dateTime).set({ minute });
  return {
    ...state,
    dateTime: datetime,
    selectedDateTime: datetime,
    view: CALENDAR_VIEW_TIME,
  };
}

function getSelectSecondActionState(state, action) {
  const { second } = action.data;
  const datetime = (state.selectedDateTime || state.dateTime).set({ second });
  return {
    ...state,
    dateTime: datetime,
    selectedDateTime: datetime,
    view: CALENDAR_VIEW_TIME,
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
    selectedDateTime,
    view: CALENDAR_VIEW_DAY,
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
    selectedDateTime,
    view: CALENDAR_VIEW_MONTH,
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
  if (type === ACTION_SELECT_HOUR) {
    return getSelectHourActionState(state, action);
  }
  if (type === ACTION_SELECT_MINUTE) {
    return getSelectMinuteActionState(state, action);
  }
  if (type === ACTION_SELECT_MONTH) {
    return getSelectMonthActionState(state, action);
  }
  if (type === ACTION_SELECT_SECOND) {
    return getSelectSecondActionState(state, action);
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
  if (type === ACTION_SET_VIEW) {
    return { ...state, view: data.view };
  }
  if (type === ACTION_TODAY) {
    const dateTime = DateTime.now().setLocale(state.dateTime.locale);
    return { ...state, dateTime };
  }
  throw new Error(`Unsupported action type "${type}"`);
}

export default calendarReducer;
