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

  const handleClickValue = useCallback((month) => (
    () => {
      onChange(dateTime.set({ month }));
      dispatch({
        type: ACTION_SELECT_MONTH,
        data: { month },
      });
    }
  ), [dateTime, dispatch, onChange]);

  return (
    <div className="CalendarMonths">
      <div className="CalendarHeader">
        <MonthButton />
        <YearButton />
        <PreviousButton />
        <TodayButton />
        <NextButton />
      </div>
      <div className="CalendarBody">
        {months.map((month, index) => {
          const monthNumber = index + 1;
          let classes = 'CalendarMonths-Month';

          if (now.month === monthNumber
            && now.hasSame(dateTime, 'year')) {
            classes += ' CalendarMonths-Month-Current';
          }
          if (selectedDateTime
            && selectedDateTime.month === monthNumber
            && selectedDateTime.hasSame(dateTime, 'month')) {
            classes += ' CalendarMonths-Month-Selected';
          }
          return (
            <button
              key={month}
              className={classes}
              onClick={handleClickValue(monthNumber)}
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
