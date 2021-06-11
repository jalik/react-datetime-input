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
    currentItemClassName,
    currentMonth,
    dateTime,
    itemClassName,
    otherClassName,
    selectedDateTime,
    selectedItemClassName,
    ...otherProps
  } = props;

  const { numberFormatter } = useCalendarContext();
  let classes = itemClassName || '';

  if (dateTime.hasSame(DateTime.now(), 'day')) {
    classes += ` ${currentItemClassName}`;
  }
  if (selectedDateTime && dateTime.hasSame(selectedDateTime, 'day')) {
    classes += ` ${selectedItemClassName}`;
  }
  if (!dateTime.hasSame(currentMonth, 'month')) {
    classes += ` ${otherClassName}`;
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
  currentItemClassName: string,
  currentMonth: instanceOf(DateTime).isRequired,
  dateTime: instanceOf(DateTime).isRequired,
  itemClassName: string,
  otherClassName: string,
  selectedDateTime: instanceOf(DateTime),
  selectedItemClassName: string,
};

CalendarDay.defaultProps = {
  currentItemClassName: ' CalendarDays-Current',
  itemClassName: 'CalendarDays-Day',
  otherClassName: 'CalendarDays-Other',
  selectedDateTime: null,
  selectedItemClassName: 'CalendarDays-Selected',
};

export default CalendarDay;
