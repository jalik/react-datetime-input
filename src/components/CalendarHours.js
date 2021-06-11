/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import {
  func,
  string,
} from 'prop-types';
import React, {
  useCallback,
  useMemo,
} from 'react';
import { ACTION_SELECT_HOUR } from '../calendarReducer';
import { getNumbers } from '../lib';
import DateButton from './buttons/DateButton';
import TimeButton from './buttons/TimeButton';
import { useCalendarContext } from './CalendarProvider';

function CalendarHours(props) {
  const {
    currentItemClassName,
    itemClassName,
    onChange,
    selectedItemClassName,
  } = props;

  const {
    dispatch,
    locale,
    numberFormatter,
    state,
  } = useCalendarContext();

  const { dateTime, selectedDateTime } = state;
  const now = DateTime.now().setLocale(locale);
  const hours = useMemo(() => getNumbers(24, 1), []);

  const handleClickValue = useCallback((hour) => (
    () => {
      onChange(dateTime.set({ hour }));
      dispatch({
        type: ACTION_SELECT_HOUR,
        data: { hour },
      });
    }
  ), [dateTime, dispatch, onChange]);

  return (
    <div className="CalendarHours">
      <div className="CalendarHeader">
        <DateButton />
        <TimeButton />
      </div>
      <div className="CalendarBody">
        {hours.map((hour) => {
          let classes = itemClassName || '';

          if (now.hour === hour
            && now.hasSame(dateTime, 'day')) {
            classes += ` ${currentItemClassName}`;
          }
          if (selectedDateTime
            && selectedDateTime.hour === hour
            && selectedDateTime.hasSame(dateTime, 'day')) {
            classes += ` ${selectedItemClassName}`;
          }
          return (
            <button
              key={hour}
              className={classes}
              onClick={handleClickValue(hour)}
              type="button"
            >
              {numberFormatter.format(hour)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

CalendarHours.propTypes = {
  currentItemClassName: string,
  itemClassName: string,
  onChange: func.isRequired,
  selectedItemClassName: string,
};

CalendarHours.defaultProps = {
  currentItemClassName: 'CalendarHours-Hour-Current',
  itemClassName: 'CalendarHours-Hour',
  selectedItemClassName: 'CalendarHours-Hour-Selected',
};

export default CalendarHours;
