/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import {
  bool,
  func,
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
    onChange,
    renderDay,
    showTimeZone,
    showWeekNumbers,
  } = props;

  const {
    dispatch,
    locale,
    numberFormatter,
    state,
  } = useCalendarContext();

  const { dateTime, selectedDateTime } = state;
  const weeks = useMemo(() => getWeeks(dateTime), [dateTime]);
  const currentMonth = useMemo(() => weeks[1].days[0].dateTime, [weeks]);
  const DayCell = renderDay || CalendarDay;

  const handleClickDay = useCallback((day) => (
    () => {
      const date = {
        day: day.day,
        month: day.month,
        year: day.year,
        hour: dateTime.hour,
        minute: dateTime.minute,
        second: dateTime.second,
      };
      dispatch({ type: ACTION_SELECT_DAY, data: { day: day.dateTime } });
      onChange(day.dateTime.set(date));
    }
  ), [dateTime.hour, dateTime.minute, dateTime.second, dispatch, onChange]);

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
              {day.dateTime.setLocale(locale).toFormat('ccccc')}
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
                  onClick={handleClickDay(day)}
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
  onChange: func.isRequired,
  renderDay: func,
  showTimeZone: bool,
  showWeekNumbers: bool,
};

CalendarDays.defaultProps = {
  renderDay: null,
  showTimeZone: false,
  showWeekNumbers: false,
};

export default CalendarDays;
