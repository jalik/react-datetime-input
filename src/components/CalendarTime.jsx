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
import {
  ACTION_SET_MODE,
  ACTION_SET_SELECTED_DATETIME,
} from '../calendarReducer';
import {
  CALENDAR_MODE_HOUR,
  CALENDAR_MODE_MINUTE,
  CALENDAR_MODE_SECOND,
} from '../modes';
import DateButton from './buttons/DateButton';
import ZoneButton from './buttons/ZoneButton';
import { useCalendarContext } from './CalendarProvider';
import Control from './Control';

function CalendarTime(props) {
  const { onChange, showTimeZone } = props;
  const { dispatch, state, toFormat } = useCalendarContext();

  const dateTime = useMemo(() => (
    state.selectedDateTime || state.dateTime
  ), [state.dateTime, state.selectedDateTime]);

  const handleClickMinus = useCallback((unit) => (
    () => {
      const dt = dateTime.minus({ [unit]: 1 });
      onChange(dt);
      dispatch({
        type: ACTION_SET_SELECTED_DATETIME,
        data: { selectedDateTime: dt },
      });
    }), [dateTime, dispatch, onChange]);

  const handleClickPlus = useCallback((unit) => (
    () => {
      const dt = dateTime.plus({ [unit]: 1 });
      onChange(dt);
      dispatch({
        type: ACTION_SET_SELECTED_DATETIME,
        data: { selectedDateTime: dt },
      });
    }), [dateTime, dispatch, onChange]);

  const handleClickValue = useCallback((unit) => (
    () => {
      dispatch({
        type: ACTION_SET_MODE,
        data: { mode: unit },
      });
    }
  ), [dispatch]);

  return (
    <div className="CalendarTime">
      <div className="CalendarHeader">
        <DateButton />
        {showTimeZone ? <ZoneButton /> : null}
      </div>
      <div className="CalendarBody">
        <Control
          onClickMinus={handleClickMinus('hour')}
          onClickPlus={handleClickPlus('hour')}
          onClickValue={handleClickValue(CALENDAR_MODE_HOUR)}
          value={toFormat(dateTime, 'HH')}
        />
        <span>:</span>
        <Control
          onClickMinus={handleClickMinus('minute')}
          onClickPlus={handleClickPlus('minute')}
          onClickValue={handleClickValue(CALENDAR_MODE_MINUTE)}
          value={toFormat(dateTime, 'mm')}
        />
        <span>:</span>
        <Control
          onClickMinus={handleClickMinus('second')}
          onClickPlus={handleClickPlus('second')}
          onClickValue={handleClickValue(CALENDAR_MODE_SECOND)}
          value={toFormat(dateTime, 'ss')}
        />
        <span>{toFormat(dateTime, 'a')}</span>
      </div>
    </div>
  );
}

CalendarTime.propTypes = {
  onChange: func.isRequired,
  showTimeZone: bool,
};

CalendarTime.defaultProps = {
  showTimeZone: false,
};

export default CalendarTime;
