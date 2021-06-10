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
  CALENDAR_MODE_DAY,
  CALENDAR_MODE_MONTH,
  CALENDAR_MODE_YEAR,
} from '../modes';

const CalendarContext = createContext(null);

/**
 * Returns the calendar context.
 * @return {null|{dispatch: function, locale: string, numberFormatter: *, state: *}}
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
    mode: oneOf([
      CALENDAR_MODE_DAY,
      CALENDAR_MODE_MONTH,
      CALENDAR_MODE_YEAR,
    ]),
    selectedDateTime: instanceOf(DateTime),
  }).isRequired,
};

CalendarProvider.defaultProps = {
  children: null,
};

export default CalendarProvider;
