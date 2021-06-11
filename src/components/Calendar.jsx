/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import {
  bool,
  func,
  oneOf,
  string,
} from 'prop-types';
import React, {
  useCallback,
  useMemo,
} from 'react';
import {
  CALENDAR_VIEW_DAY,
  CALENDAR_VIEW_HOUR,
  CALENDAR_VIEW_MINUTE,
  CALENDAR_VIEW_MONTH,
  CALENDAR_VIEW_SECOND,
  CALENDAR_VIEW_TIME,
  CALENDAR_VIEW_YEAR,
} from '../calendarViews';
import { getDefaultLanguage } from '../lib';
import useCalendar from '../useCalendar';
import CalendarDays from './CalendarDays';
import CalendarHours from './CalendarHours';
import CalendarMinutes from './CalendarMinutes';
import CalendarMonths from './CalendarMonths';
import CalendarProvider from './CalendarProvider';
import CalendarSeconds from './CalendarSeconds';
import CalendarTime from './CalendarTime';
import CalendarYears from './CalendarYears';

function Calendar(props) {
  const {
    date,
    disabled,
    maxDate,
    minDate,
    locale,
    onChange,
    renderDay,
    selectedDate,
    showTimeZone,
    showWeekNumbers,
    view,
  } = props;

  const context = useCalendar({
    date,
    locale,
    selectedDate,
    view,
  });
  const { state } = context;

  const handleChange = useCallback((dateTime) => {
    if (!disabled) {
      onChange(dateTime.toISO());
    }
  }, [disabled, onChange]);

  const days = useMemo(() => {
    if (state.view === CALENDAR_VIEW_DAY) {
      return (
        <CalendarDays
          maxDate={maxDate}
          minDate={minDate}
          onChange={handleChange}
          renderDay={renderDay}
          showTimeZone={showTimeZone}
          showWeekNumbers={showWeekNumbers}
        />
      );
    }
    if (state.view === CALENDAR_VIEW_MONTH) {
      return <CalendarMonths onChange={handleChange} />;
    }
    if (state.view === CALENDAR_VIEW_YEAR) {
      return <CalendarYears onChange={handleChange} />;
    }
    if (state.view === CALENDAR_VIEW_TIME) {
      return (
        <CalendarTime
          onChange={handleChange}
          showTimeZone={showTimeZone}
        />
      );
    }
    if (state.view === CALENDAR_VIEW_HOUR) {
      return <CalendarHours onChange={handleChange} />;
    }
    if (state.view === CALENDAR_VIEW_MINUTE) {
      return <CalendarMinutes onChange={handleChange} />;
    }
    if (state.view === CALENDAR_VIEW_SECOND) {
      return <CalendarSeconds onChange={handleChange} />;
    }
    return null;
  }, [handleChange, maxDate, minDate, renderDay, showTimeZone, showWeekNumbers, state.view]);

  return (
    <CalendarProvider context={context}>
      <div className="CalendarWrapper">
        <div className="CalendarBkg" />
        <fieldset
          className="Calendar"
          disabled={disabled}
        >
          {days}
        </fieldset>
      </div>
    </CalendarProvider>
  );
}

Calendar.propTypes = {
  date: string,
  disabled: bool,
  maxDate: string,
  minDate: string,
  locale: string,
  onChange: func.isRequired,
  renderDay: func,
  selectedDate: string,
  showTimeZone: bool,
  showWeekNumbers: bool,
  view: oneOf([
    CALENDAR_VIEW_DAY,
    CALENDAR_VIEW_MINUTE,
    CALENDAR_VIEW_MONTH,
    CALENDAR_VIEW_SECOND,
    CALENDAR_VIEW_TIME,
    CALENDAR_VIEW_YEAR,
  ]),
};

Calendar.defaultProps = {
  date: null,
  disabled: false,
  maxDate: null,
  minDate: null,
  locale: getDefaultLanguage(),
  renderDay: null,
  selectedDate: null,
  showTimeZone: false,
  showWeekNumbers: false,
  view: CALENDAR_VIEW_DAY,
};

export default Calendar;
