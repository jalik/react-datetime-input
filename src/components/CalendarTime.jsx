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
import { ACTION_SET_SELECTED_DATETIME } from '../calendarReducer';
import DateButton from './buttons/DateButton';
import ZoneButton from './buttons/ZoneButton';
import { useCalendarContext } from './CalendarProvider';
import NumberControl from './NumberControl';

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

  return (
    <div className="DateTimeInput-CalendarTime">
      <div className="DateTimeInput-CalendarHeader">
        <DateButton />
        {showTimeZone ? <ZoneButton /> : null}
      </div>
      <div className="DateTimeInput-CalendarBody">
        <NumberControl
          onClickMinus={handleClickMinus('hour')}
          onClickPlus={handleClickPlus('hour')}
          value={toFormat(dateTime, 'HH')}
        />
        <span>:</span>
        <NumberControl
          onClickMinus={handleClickMinus('minute')}
          onClickPlus={handleClickPlus('minute')}
          value={toFormat(dateTime, 'mm')}
        />
        <span>:</span>
        <NumberControl
          onClickMinus={handleClickMinus('second')}
          onClickPlus={handleClickPlus('second')}
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
