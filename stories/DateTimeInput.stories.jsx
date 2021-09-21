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
  const [fields, setFields] = useState({});

  const handleChange = useCallback((event) => {
    setDate(event.target.value);
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setFields({ date });
  }, [date]);

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
        <div>
          <div style={{ display: 'flex' }}>
            <DateTimeInput
              format="D tt"
              name="date"
              onChange={handleChange}
              value={date}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...otherProps}
            />
            <button type="submit">
              Submit
            </button>
          </div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <div>{`Selected date is ${date ? DateTime.fromISO(date).toISO() : null}`}</div>
          <div>
            <p>Submitted fields:</p>
            <pre>{JSON.stringify(fields)}</pre>
          </div>
        </div>
      </div>
    </form>
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

export const EmptyDateTimeInputStory = Template.bind({});
EmptyDateTimeInputStory.args = { ...defaultArgs };

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

export const DateTimeInputWithTransformStory = Template.bind({});
DateTimeInputWithTransformStory.args = {
  ...defaultArgs,
  transform: (inputValue, oldValue) => {
    if (/\d$/.test(oldValue)) {
      if (/^\d{2}(\/\d{2})?$/.test(inputValue)) {
        return `${inputValue}/`;
      }
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(inputValue)) {
        return `${inputValue} `;
      }
      if (/^\d{2}\/\d{2}\/\d{4} \d{2}(:\d{2})?$/.test(inputValue)) {
        return `${inputValue}:`;
      }
    }
    return inputValue;
  },
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
  component: EmptyDateTimeInputStory,
  argTypes: {
    locale: {
      options: ['en-US', 'es', 'fr-FR', 'hi', 'ja', 'fa', 'ru', 'zh'],
      control: { type: 'radio' },
    },
  },
};
