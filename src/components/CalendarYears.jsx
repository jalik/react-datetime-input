/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import {
  func,
  number,
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
  const { onChange, size } = props;
  const {
    dispatch,
    locale,
    numberFormatter,
    state,
  } = useCalendarContext();

  const { dateTime, selectedDateTime } = state;
  const now = DateTime.now().setLocale(locale);
  const years = useMemo(() => getYears(dateTime.year, size), [dateTime.year, size]);

  const handleClickYear = useCallback((year) => (
    () => {
      onChange(dateTime.set({ year }));
      dispatch({
        type: ACTION_SELECT_YEAR,
        data: { year },
      });
    }
  ), [dateTime, dispatch, onChange]);

  return (
    <div className="DateTimeInput-CalendarYears">
      <div className="DateTimeInput-CalendarHeader">
        <MonthButton />
        <YearButton />
        <PreviousButton />
        <TodayButton />
        <NextButton />
      </div>
      <div className="DateTimeInput-CalendarBody">
        {years.map((year) => {
          let classes = 'DateTimeInput-CalendarYears-Year';

          if (now.year === year) {
            classes += ' DateTimeInput-CalendarYears-Year-Current';
          }
          if (selectedDateTime && selectedDateTime.year === year) {
            classes += ' DateTimeInput-CalendarYears-Year-Selected';
          }
          return (
            <button
              key={year}
              className={classes}
              onClick={handleClickYear(year)}
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
  onChange: func.isRequired,
  size: number,
};

CalendarYears.defaultProps = {
  size: 12,
};

export default CalendarYears;
