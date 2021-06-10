/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React from 'react';
import { useCalendarContext } from '../CalendarProvider';

function ZoneButton() {
  const { state, toFormat } = useCalendarContext();
  const { dateTime } = state;
  return (
    <button
      className="DateTimeInput-CalendarHeader-Zone"
      disabled
      type="button"
    >
      {toFormat(dateTime, 'ZZZZ')}
    </button>
  );
}

export default ZoneButton;
