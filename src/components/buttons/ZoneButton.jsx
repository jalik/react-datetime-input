/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React from 'react';
import { useCalendarContext } from '../CalendarProvider';

function ZoneButton() {
  const { locale, state } = useCalendarContext();
  const { dateTime } = state;
  return (
    <button
      className="DateTimeInput-CalendarHeader-Zone"
      disabled
      type="button"
    >
      {dateTime.setLocale(locale).toFormat('ZZZZ')}
    </button>
  );
}

export default ZoneButton;
