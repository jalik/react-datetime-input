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
import { ACTION_SELECT_MINUTE } from '../calendarReducer';
import { getNumbers } from '../lib';
import DateButton from './buttons/DateButton';
import TimeButton from './buttons/TimeButton';
import { useCalendarContext } from './CalendarProvider';

function CalendarMinutes(props) {
  const { onChange } = props;
  const {
    dispatch,
    locale,
    numberFormatter,
    state,
  } = useCalendarContext();

  const { dateTime, selectedDateTime } = state;
  const now = DateTime.now().setLocale(locale);
  const minutes = useMemo(() => getNumbers(60, 5), []);

  const handleClickValue = useCallback((minute) => (
    () => {
      onChange(dateTime.set({ minute }));
      dispatch({
        type: ACTION_SELECT_MINUTE,
        data: { minute },
      });
    }
  ), [dateTime, dispatch, onChange]);

  return (
    <div className="CalendarMinutes">
      <div className="CalendarHeader">
        <DateButton />
        <TimeButton />
      </div>
      <div className="CalendarBody">
        {minutes.map((minute) => {
          let classes = 'CalendarMinutes-Minute';

          if (now.minute === minute
            && now.hasSame(dateTime, 'hour')) {
            classes += ' CalendarMinutes-Minute-Current';
          }
          if (selectedDateTime
            && selectedDateTime.minute === minute
            && selectedDateTime.hasSame(dateTime, 'hour')) {
            classes += ' CalendarMinutes-Minute-Selected';
          }
          return (
            <button
              key={minute}
              className={classes}
              onClick={handleClickValue(minute)}
              type="button"
            >
              {numberFormatter.format(minute)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

CalendarMinutes.propTypes = {
  onChange: func.isRequired,
};

CalendarMinutes.defaultProps = {};

export default CalendarMinutes;
