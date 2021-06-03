/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import {
  instanceOf,
  string,
} from 'prop-types';
import React from 'react';
import { useCalendarContext } from './CalendarProvider';

function CalendarDay(props) {
  const {
    className,
    currentMonth,
    dateTime,
    selectedDateTime,
    ...otherProps
  } = props;

  const { numberFormatter } = useCalendarContext();
  let classes = className || '';

  if (!dateTime.hasSame(currentMonth, 'month')) {
    classes += ' DateTimeInput-CalendarDays-Other';
  }
  if (dateTime.hasSame(DateTime.now(), 'day')) {
    classes += ' DateTimeInput-CalendarDays-Current';
  }
  if (selectedDateTime && dateTime.hasSame(selectedDateTime, 'day')) {
    classes += ' DateTimeInput-CalendarDays-Selected';
  }
  return (
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      className={classes}
      type="button"
    >
      {numberFormatter.format(dateTime.day)}
    </button>
  );
}

CalendarDay.propTypes = {
  className: string,
  currentMonth: instanceOf(DateTime).isRequired,
  dateTime: instanceOf(DateTime).isRequired,
  selectedDateTime: instanceOf(DateTime),
};

CalendarDay.defaultProps = {
  className: 'DateTimeInput-CalendarDays-Day',
  selectedDateTime: null,
};

export default CalendarDay;
