/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import { func } from 'prop-types';
import React, {
  useCallback,
  useMemo,
} from 'react';
import { ACTION_SELECT_MONTH } from '../calendarReducer';
import { getMonths } from '../lib';
import MonthButton from './buttons/MonthButton';
import NextButton from './buttons/NextButton';
import PreviousButton from './buttons/PreviousButton';
import TodayButton from './buttons/TodayButton';
import YearButton from './buttons/YearButton';
import { useCalendarContext } from './CalendarProvider';

function CalendarMonths(props) {
  const { onChange } = props;
  const { dispatch, locale, state } = useCalendarContext();
  const { dateTime, selectedDateTime } = state;
  const now = DateTime.now().setLocale(locale);
  const months = useMemo(() => getMonths(locale), [locale]);

  const handleClickMonth = useCallback((month) => (
    () => {
      onChange(dateTime.set({ month }));
      dispatch({
        type: ACTION_SELECT_MONTH,
        data: { month },
      });
    }
  ), [dateTime, dispatch, onChange]);

  return (
    <div className="DateTimeInput-CalendarMonths">
      <div className="DateTimeInput-CalendarHeader">
        <MonthButton />
        <YearButton />
        <PreviousButton />
        <TodayButton />
        <NextButton />
      </div>
      <div className="DateTimeInput-CalendarBody">
        {months.map((month, index) => {
          const monthNumber = index + 1;
          let classes = 'DateTimeInput-CalendarMonths-Month';

          if (now.month === monthNumber
            && now.hasSame(dateTime, 'year')) {
            classes += ' DateTimeInput-CalendarMonths-Month-Current';
          }
          if (selectedDateTime
            && selectedDateTime.month === monthNumber
            && selectedDateTime.hasSame(dateTime, 'month')) {
            classes += ' DateTimeInput-CalendarMonths-Month-Selected';
          }
          return (
            <button
              key={month}
              className={classes}
              onClick={handleClickMonth(monthNumber)}
              type="button"
            >
              {month}
            </button>
          );
        })}
      </div>
    </div>
  );
}

CalendarMonths.propTypes = {
  onChange: func.isRequired,
};

CalendarMonths.defaultProps = {};

export default CalendarMonths;
