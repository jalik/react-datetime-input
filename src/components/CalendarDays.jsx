/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import {
  bool,
  func,
  string,
} from 'prop-types';
import React, {
  useCallback,
  useMemo,
} from 'react';
import { ACTION_SELECT_DAY } from '../calendarReducer';
import { getWeeks } from '../lib';
import MonthButton from './buttons/MonthButton';
import NextButton from './buttons/NextButton';
import PreviousButton from './buttons/PreviousButton';
import TimeButton from './buttons/TimeButton';
import TodayButton from './buttons/TodayButton';
import YearButton from './buttons/YearButton';
import ZoneButton from './buttons/ZoneButton';
import CalendarDay from './CalendarDay';
import { useCalendarContext } from './CalendarProvider';

function CalendarDays(props) {
  const {
    maxDate,
    minDate,
    onChange,
    renderDay,
    showTimeZone,
    showWeekNumbers,
  } = props;

  const {
    dispatch,
    numberFormatter,
    state,
    toFormat,
  } = useCalendarContext();

  const { dateTime, selectedDateTime } = state;
  const maxDateTime = useMemo(() => (maxDate ? DateTime.fromISO(maxDate) : null), [maxDate]);
  const minDateTime = useMemo(() => (minDate ? DateTime.fromISO(minDate) : null), [minDate]);
  const weeks = useMemo(() => getWeeks(dateTime), [dateTime]);
  const currentMonth = useMemo(() => weeks[1].days[0].dateTime, [weeks]);
  const DayCell = renderDay || CalendarDay;

  const isDayDisabled = useCallback((day) => (
    (minDateTime && day < minDateTime.startOf('day'))
    || (maxDateTime && day > maxDateTime.endOf('day'))
  ), [maxDateTime, minDateTime]);

  const handleClickDay = useCallback((day) => (
    () => {
      let dt = dateTime.set({
        day: day.day,
        month: day.month,
        year: day.year,
      });

      // Use maximal valid date.
      if (minDateTime && minDateTime.isValid) {
        dt = DateTime.max(minDateTime, dt);
      }
      // Use minimal valid date.
      if (maxDateTime && maxDateTime.isValid) {
        dt = DateTime.min(maxDateTime, dt);
      }
      onChange(dt);
      dispatch({
        type: ACTION_SELECT_DAY,
        data: { day: dt },
      });
    }
  ), [dateTime, dispatch, maxDateTime, minDateTime, onChange]);

  return (
    <div className="DateTimeInput-CalendarDays">
      <div className="DateTimeInput-CalendarHeader">
        <MonthButton />
        <YearButton />
        <PreviousButton />
        <TodayButton />
        <NextButton />
      </div>
      <div className="DateTimeInput-CalendarBody">
        <div className="DateTimeInput-CalendarDays-DayNames">
          {showWeekNumbers ? (
            <div />
          ) : null}
          {weeks[0].days.map((day) => (
            <small key={day.dateString}>
              {toFormat(day.dateTime, 'ccccc')}
            </small>
          ))}
        </div>
        <div className="DateTimeInput-CalendarDays-Weeks">
          {weeks.map((week) => (
            <div key={week.number}>
              {showWeekNumbers ? (
                <small className="DateTimeInput-CalendarDays-WeekNumber">
                  {numberFormatter.format(week.number)}
                </small>
              ) : null}

              {week.days.map((day) => (
                <DayCell
                  key={day.dateString}
                  currentMonth={currentMonth}
                  dateTime={day.dateTime}
                  disabled={isDayDisabled(day.dateTime)}
                  onClick={handleClickDay(day.dateTime)}
                  selectedDateTime={selectedDateTime}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="DateTimeInput-CalendarFooter">
        <TimeButton />
        {showTimeZone ? <ZoneButton /> : null}
      </div>
    </div>
  );
}

CalendarDays.propTypes = {
  maxDate: string,
  minDate: string,
  onChange: func.isRequired,
  renderDay: func,
  showTimeZone: bool,
  showWeekNumbers: bool,
};

CalendarDays.defaultProps = {
  maxDate: null,
  minDate: null,
  renderDay: null,
  showTimeZone: false,
  showWeekNumbers: false,
};

export default CalendarDays;
