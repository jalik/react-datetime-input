/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import {
  instanceOf,
  node,
  oneOf,
  shape,
} from 'prop-types';
import React, {
  createContext,
  useContext,
} from 'react';
import {
  CALENDAR_VIEW_DAY,
  CALENDAR_VIEW_HOUR,
  CALENDAR_VIEW_MINUTE,
  CALENDAR_VIEW_MONTH,
  CALENDAR_VIEW_SECOND,
  CALENDAR_VIEW_TIME,
  CALENDAR_VIEW_YEAR,
} from '../calendarViews';

const CalendarContext = createContext(null);

/**
 * Returns the calendar context.
 * @return {null|{
 * dispatch: function,
 * locale: string,
 * numberFormatter: *,
 * state: *,
 * toFormat: function
 * }}
 */
export function useCalendarContext() {
  return useContext(CalendarContext);
}

function CalendarProvider(props) {
  const { children, context } = props;
  return (
    <CalendarContext.Provider value={context}>
      {children}
    </CalendarContext.Provider>
  );
}

CalendarProvider.propTypes = {
  children: node,
  context: shape({
    dateTime: instanceOf(DateTime),
    selectedDateTime: instanceOf(DateTime),
    view: oneOf([
      CALENDAR_VIEW_DAY,
      CALENDAR_VIEW_HOUR,
      CALENDAR_VIEW_MINUTE,
      CALENDAR_VIEW_MONTH,
      CALENDAR_VIEW_SECOND,
      CALENDAR_VIEW_TIME,
      CALENDAR_VIEW_YEAR,
    ]),
  }).isRequired,
};

CalendarProvider.defaultProps = {
  children: null,
};

export default CalendarProvider;
