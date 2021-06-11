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
import { ACTION_SELECT_SECOND } from '../calendarReducer';
import { getNumbers } from '../lib';
import DateButton from './buttons/DateButton';
import TimeButton from './buttons/TimeButton';
import { useCalendarContext } from './CalendarProvider';

function CalendarSeconds(props) {
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
  const seconds = useMemo(() => getNumbers(60, 5), []);

  const handleClickValue = useCallback((second) => (
    () => {
      onChange(dateTime.set({ second }));
      dispatch({
        type: ACTION_SELECT_SECOND,
        data: { second },
      });
    }
  ), [dateTime, dispatch, onChange]);

  return (
    <div className="CalendarSeconds">
      <div className="CalendarHeader">
        <DateButton />
        <TimeButton />
      </div>
      <div className="CalendarBody">
        {seconds.map((second) => {
          let classes = itemClassName || '';

          if (now.second === second
            && now.hasSame(dateTime, 'minute')) {
            classes += ` ${currentItemClassName}`;
          }
          if (selectedDateTime
            && selectedDateTime.second === second
            && selectedDateTime.hasSame(dateTime, 'minute')) {
            classes += ` ${selectedItemClassName}`;
          }
          return (
            <button
              key={second}
              className={classes}
              onClick={handleClickValue(second)}
              type="button"
            >
              {numberFormatter.format(second)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

CalendarSeconds.propTypes = {
  currentItemClassName: string,
  itemClassName: string,
  onChange: func.isRequired,
  selectedItemClassName: string,
};

CalendarSeconds.defaultProps = {
  currentItemClassName: 'CalendarSeconds-Second-Current',
  itemClassName: 'CalendarSeconds-Second',
  selectedItemClassName: 'CalendarSeconds-Second-Selected',
};

export default CalendarSeconds;
