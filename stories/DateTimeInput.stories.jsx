/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import { DateTime } from 'luxon';
import React, {
  useCallback,
  useState,
} from 'react';
import {
  CalendarDay,
  DateTimeInput,
} from '../src';
import '../src/styles.css';

function Template(props) {
  // eslint-disable-next-line react/prop-types
  const { value, ...otherProps } = props;
  const [date, setDate] = useState(value);

  const handleChange = useCallback((event) => {
    setDate(event.target.value);
  }, []);

  return (
    <>
      <p>{`Selected date is ${date ? DateTime.fromISO(date).toISO() : null}`}</p>
      <DateTimeInput
        format="D tt"
        name="date"
        onChange={handleChange}
        value={date}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      />
    </>
  );
}

const defaultArgs = {
  autoFocus: true,
  disabled: false,
  format: 'D tt',
  locale: navigator.language,
  showCalendarIcon: true,
  showCalendarOnFocus: true,
  showTimeZone: true,
  showWeekNumbers: true,
};

export const EmtpyDateTimeInputStory = Template.bind({});
EmtpyDateTimeInputStory.args = { ...defaultArgs };

export const FilledDateTimeInputStory = Template.bind({});
FilledDateTimeInputStory.args = {
  ...defaultArgs,
  value: DateTime.now().set({ hour: 13, minute: 30, second: 10 }).toISO(),
};

export const DateTimeInputWithMaxStory = Template.bind({});
DateTimeInputWithMaxStory.args = {
  ...defaultArgs,
  max: DateTime.now().toISO(),
};

export const DateTimeInputWithMinStory = Template.bind({});
DateTimeInputWithMinStory.args = {
  ...defaultArgs,
  min: DateTime.now().toISO(),
};

function CustomDayCell(props) {
  // eslint-disable-next-line no-unused-vars,react/prop-types
  const { dateTime } = props;
  // eslint-disable-next-line react/prop-types
  const isWeekEnd = dateTime.weekday > 5;
  const style = isWeekEnd ? { color: 'red' } : {};
  // We use the default component for rendering day, so we have less code to write.
  // But we could use another component with a complete different logic.
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <CalendarDay {...props} style={style} />;
}

export const DateTimeInputWithCustomRenderDayStory = Template.bind({});
DateTimeInputWithCustomRenderDayStory.args = {
  ...defaultArgs,
  autoFocus: true,
  renderDay: CustomDayCell,
};

export default {
  title: 'DateTimeInput',
  component: EmtpyDateTimeInputStory,
  argTypes: {
    locale: {
      options: ['en-US', 'es', 'fr-FR', 'hi', 'ja', 'fa', 'ru', 'zh'],
      control: { type: 'radio' },
    },
  },
};
