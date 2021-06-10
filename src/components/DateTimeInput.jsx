/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import {
  bool,
  func,
  node,
  string,
} from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getDefaultLanguage } from '../lib';
import CalendarButton from './buttons/CalendarButton';

import Calendar from './Calendar';

function DateTimeInput(props) {
  const {
    calendarIcon,
    className,
    disabled,
    format,
    locale,
    max,
    min,
    name,
    onBlur,
    onChange,
    onFocus,
    renderDay,
    showCalendarIcon,
    showCalendarOnFocus,
    showTimeZone,
    showWeekNumbers,
    value,
    ...inputProps
  } = props;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [localValue, setLocalValue] = useState(null);
  const classes = className || '';

  const dateTime = useMemo(() => {
    const dt = localValue ? DateTime.fromFormat(localValue, format, { locale }) : null;
    return dt && dt.isValid ? dt : null;
  }, [format, localValue, locale]);

  const dateIso = dateTime && dateTime.isValid ? dateTime.toISO() : null;

  const isValueDisabled = useCallback((dateString) => {
    const dt = DateTime.fromISO(dateString);
    return (min && dt < DateTime.fromISO(min))
      || (max && dt > DateTime.fromISO(max));
  }, [max, min]);

  const handleBlur = useCallback((event) => {
    if (onBlur) onBlur(event);
    if (event.target.value === '') {
      // Clear value if field is empty.
      onChange({ target: { name, value: null } });
    } else if (dateTime && dateTime.isValid) {
      // Update value if local value is valid.
      onChange({ target: { name, value: dateTime.toISO() } });
    } else {
      // Restore current value if local value is not valid.
      const dt = DateTime.fromISO(value, { locale });
      setLocalValue(dt.isValid ? dt.toFormat(format) : null);
    }
  }, [dateTime, format, locale, name, onBlur, onChange, value]);

  const handleChange = useCallback((dateString) => {
    // Do nothing if field is disabled or if value is disabled.
    if (!disabled && !isValueDisabled(dateString)) {
      onChange({ target: { name, value: dateString } });
    }
  }, [disabled, isValueDisabled, name, onChange]);

  const handleChangeLocalValue = useCallback((event) => {
    setLocalValue(event.target.value);
    // Clear value when field is empty.
    if (event.target.value === '') {
      onChange({ target: { name, value: null } });
    }
  }, [name, onChange]);

  const handleClickCatcher = useCallback(() => {
    setIsCalendarOpen(false);
  }, []);

  const handleFocus = useCallback((event) => {
    if (onFocus) onFocus(event);
    if (showCalendarOnFocus) {
      setIsCalendarOpen(true);
    }
  }, [onFocus, showCalendarOnFocus]);

  const toggleCalendar = useCallback(() => {
    setIsCalendarOpen((s) => !s);
  }, []);

  useEffect(() => {
    const dt = DateTime.fromISO(value, { locale });
    setLocalValue(dt.isValid ? dt.toFormat(format) : null);
  }, [format, locale, value]);

  return (
    <>
      {isCalendarOpen ? (
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/control-has-associated-label,jsx-a11y/no-static-element-interactions
        <div
          className="DateTimeInputCatcher"
          onClick={handleClickCatcher}
        />
      ) : null}

      <div className="DateTimeInputWrapper">
        <input
          disabled={disabled}
          name={name}
          type="hidden"
          value={dateIso || ''}
        />
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
          className={classes}
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChangeLocalValue}
          onFocus={handleFocus}
          value={localValue || ''}
        />

        {showCalendarIcon ? (
          <CalendarButton
            icon={calendarIcon}
            onClick={toggleCalendar}
          />
        ) : null}

        {isCalendarOpen ? (
          <Calendar
            date={dateIso}
            disabled={disabled}
            maxDate={max}
            minDate={min}
            locale={locale}
            onChange={handleChange}
            renderDay={renderDay}
            selectedDate={dateIso}
            showTimeZone={showTimeZone}
            showWeekNumbers={showWeekNumbers}
          />
        ) : null}
      </div>
    </>
  );
}

DateTimeInput.propTypes = {
  calendarIcon: node,
  className: string,
  disabled: bool,
  format: string,
  max: string,
  min: string,
  locale: string,
  name: string.isRequired,
  onBlur: func,
  onChange: func,
  onFocus: func,
  renderDay: func,
  showCalendarIcon: bool,
  showCalendarOnFocus: bool,
  showTimeZone: bool,
  showWeekNumbers: bool,
  value: string,
};

DateTimeInput.defaultProps = {
  calendarIcon: null,
  className: null,
  disabled: false,
  format: 'D tt',
  max: null,
  min: null,
  locale: getDefaultLanguage(),
  onBlur: null,
  onChange: null,
  onFocus: null,
  renderDay: null,
  showCalendarIcon: false,
  showCalendarOnFocus: false,
  showTimeZone: false,
  showWeekNumbers: false,
  value: null,
};

export default DateTimeInput;
