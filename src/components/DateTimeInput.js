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
  useRef,
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
    onKeyDown,
    renderDay,
    showCalendarIcon,
    showCalendarOnFocus,
    showTimeZone,
    showWeekNumbers,
    transform,
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
    if (localValue === '') {
      if (value !== '') {
        // Clear value if field is empty.
        onChange({ target: { name, value: null } });
      }
    } else if (dateIso && !isValueDisabled(dateIso)) {
      // Update value if local value is valid.
      onChange({ target: { name, value: dateIso } });
    } else {
      // Restore current value if local value is not valid.
      const dt = DateTime.fromISO(value, { locale });
      setLocalValue(dt.isValid ? dt.toFormat(format) : null);
    }
  }, [dateIso, format, isValueDisabled, localValue, locale, name, onBlur, onChange, value]);

  const handleChange = useCallback((dateString) => {
    // Do nothing if field is disabled or if value is disabled.
    if (!disabled && !isValueDisabled(dateString)) {
      onChange({ target: { name, value: dateString } });
    }
  }, [disabled, isValueDisabled, name, onChange]);

  const handleChangeLocalValue = useCallback((event) => {
    // Allow to transform value on the fly.
    const inputValue = transform
      ? transform(event.target.value, localValue)
      : event.target.value;
    // Update local value.
    setLocalValue(inputValue);
    // Clear value when field is empty.
    if (inputValue === '') {
      onChange({ target: { name, value: null } });
    }
  }, [localValue, name, onChange, transform]);

  const handleFocus = useCallback((event) => {
    if (onFocus) onFocus(event);
    if (showCalendarOnFocus) {
      setIsCalendarOpen(true);
    }
  }, [onFocus, showCalendarOnFocus]);

  const handleKeyDown = useCallback((event) => {
    // Close calendar when user press a key.
    setIsCalendarOpen(false);

    if (onKeyDown) {
      onKeyDown(event);
    }
    // Validate and update value when "Enter" key pressed.
    if (event.key === 'Enter' && dateIso && !isValueDisabled(dateIso)) {
      onChange({ target: { name, value: dateIso } });
    }
  }, [dateIso, isValueDisabled, name, onChange, onKeyDown]);

  const toggleCalendar = useCallback(() => {
    setIsCalendarOpen((s) => !s);
  }, []);

  useEffect(() => {
    const dt = DateTime.fromISO(value, { locale });
    setLocalValue(dt.isValid ? dt.toFormat(format) : null);
  }, [format, locale, value]);

  const wrapperRef = useRef();
  useEffect(() => {
    const clickListener = (event) => {
      // Close calendar if user clicks outside.
      if (!wrapperRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen && typeof document !== 'undefined') {
      document.addEventListener('mousedown', clickListener);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousedown', clickListener);
      }
    };
  }, [isCalendarOpen, setIsCalendarOpen]);

  return (
    <div
      className="DateTimeInputWrapper"
      ref={wrapperRef}
    >
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inputProps}
        className={classes}
        disabled={disabled}
        name={name}
        onBlur={handleBlur}
        onChange={handleChangeLocalValue}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
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
  onKeyDown: func,
  renderDay: func,
  showCalendarIcon: bool,
  showCalendarOnFocus: bool,
  showTimeZone: bool,
  showWeekNumbers: bool,
  transform: func,
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
  onKeyDown: null,
  renderDay: null,
  showCalendarIcon: false,
  showCalendarOnFocus: false,
  showTimeZone: false,
  showWeekNumbers: false,
  transform: null,
  value: null,
};

export default DateTimeInput;
