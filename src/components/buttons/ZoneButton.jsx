/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React from 'react';
import { useCalendarContext } from '../CalendarProvider';

function ZoneButton() {
  const { state } = useCalendarContext();
  const { dateTime } = state;
  return (
    <span className="DateTimeInput-CalendarHeader-Zone">
      {dateTime.toFormat('ZZZZ')}
    </span>
  );
}

export default ZoneButton;
