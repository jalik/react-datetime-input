/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import {
  func,
  number,
  string,
} from 'prop-types';
import React, {
  useCallback,
  useMemo,
} from 'react';
import { ACTION_SELECT_YEAR } from '../calendarReducer';
import { getYears } from '../lib';
import MonthButton from './buttons/MonthButton';
import NextButton from './buttons/NextButton';
import PreviousButton from './buttons/PreviousButton';
import TodayButton from './buttons/TodayButton';
import YearButton from './buttons/YearButton';
import { useCalendarContext } from './CalendarProvider';

function CalendarYears(props) {
  const {
    currentItemClassName,
    onChange,
    selectedItemClassName,
    size,
    itemClassName,
  } = props;

  const {
    dispatch,
    locale,
    numberFormatter,
    state,
  } = useCalendarContext();

  const { dateTime, selectedDateTime } = state;
  const now = DateTime.now().setLocale(locale);
  const years = useMemo(() => getYears(dateTime.year, size), [dateTime.year, size]);

  const handleClickValue = useCallback((year) => (
    () => {
      onChange(dateTime.set({ year }));
      dispatch({
        type: ACTION_SELECT_YEAR,
        data: { year },
      });
    }
  ), [dateTime, dispatch, onChange]);

  return (
    <div className="CalendarYears">
      <div className="CalendarHeader">
        <MonthButton />
        <YearButton />
        <PreviousButton />
        <TodayButton />
        <NextButton />
      </div>
      <div className="CalendarBody">
        {years.map((year) => {
          let classes = itemClassName || '';

          if (now.year === year) {
            classes += ` ${currentItemClassName}`;
          }
          if (selectedDateTime && selectedDateTime.year === year) {
            classes += ` ${selectedItemClassName}`;
          }
          return (
            <button
              key={year}
              className={classes}
              onClick={handleClickValue(year)}
              type="button"
            >
              {numberFormatter.format(year)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

CalendarYears.propTypes = {
  currentItemClassName: string,
  itemClassName: string,
  onChange: func.isRequired,
  selectedItemClassName: string,
  size: number,
};

CalendarYears.defaultProps = {
  currentItemClassName: 'CalendarYears-Year-Current',
  itemClassName: 'CalendarYears-Year',
  selectedItemClassName: 'CalendarYears-Year-Selected',
  size: 12,
};

export default CalendarYears;
