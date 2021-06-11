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
import { ACTION_SELECT_SECOND } from '../calendarReducer';
import { getNumbers } from '../lib';
import DateButton from './buttons/DateButton';
import TimeButton from './buttons/TimeButton';
import { useCalendarContext } from './CalendarProvider';

function CalendarSeconds(props) {
  const { onChange } = props;
  const {
    dispatch,
    locale,
    numberFormatter,
    state,
  } = useCalendarContext();

  const { dateTime, selectedDateTime } = state;
  const now = DateTime.now().setLocale(locale);
  const seconds = useMemo(() => getNumbers(60, 5), []);

  const handleClickSecond = useCallback((second) => (
    () => {
      onChange(dateTime.set({ second }));
      dispatch({
        type: ACTION_SELECT_SECOND,
        data: { second },
      });
    }
  ), [dateTime, dispatch, onChange]);

  return (
    <div className="CalendarSeconds">
      <div className="CalendarHeader">
        <DateButton />
        <TimeButton />
      </div>
      <div className="CalendarBody">
        {seconds.map((second) => {
          let classes = 'CalendarSeconds-Second';

          if (now.second === second
            && now.hasSame(dateTime, 'minute')) {
            classes += ' CalendarSeconds-Second-Current';
          }
          if (selectedDateTime
            && selectedDateTime.second === second
            && selectedDateTime.hasSame(dateTime, 'minute')) {
            classes += ' CalendarSeconds-Second-Selected';
          }
          return (
            <button
              key={second}
              className={classes}
              onClick={handleClickSecond(second)}
              type="button"
            >
              {numberFormatter.format(second)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

CalendarSeconds.propTypes = {
  onChange: func.isRequired,
};

CalendarSeconds.defaultProps = {};

export default CalendarSeconds;
