# @jalik/react-datetime-input

![GitHub package.json version](https://img.shields.io/github/package-json/v/jalik/react-datetime-input.svg)
![GitHub](https://img.shields.io/github/license/jalik/react-datetime-input.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/jalik/react-datetime-input.svg)
[![GitHub issues](https://img.shields.io/github/issues/jalik/react-datetime-input.svg)](https://github.com/jalik/react-datetime-input/issues)
![npm](https://img.shields.io/npm/dt/@jalik/react-datetime-input.svg)

## Introduction

This lib allows you to add datetime inputs in your React applications with the following advantages.

- Available in CJS and ESM (tree shakeable)
- Multiple selection modes (year, month, day, time)
- Support for min and max datetime
- Support for custom day renderer
- Customizable datetime format
- Customizable view (locale, week numbers, timezone...)
- Works like a normal input (onChange/value)
- Based on Intl API to support any language (English, French, Chinese...)
- Based on [luxon](https://moment.github.io/luxon/) for date and time manipulation

**NOTICE : The code has been tested with controlled components only.**

![Calendar](docs/images/calendar_days_en-US.jpg)
![Calendar](docs/images/calendar_years_en-US.jpg)
![Calendar](docs/images/calendar_months_en-US.jpg)
![Calendar](docs/images/calendar_time_en-US.jpg)

## Quickstart

The code below shows how to add a datetime input field with a default value and handling its
changes.

```js
import { DateTimeInput } from '@jalik/react-datetime-input';
import React, {
  useCallback,
  useState
} from 'react';

// Don't forget to load default styles.
import '@jalik/react-datetime-input/src/styles.css';

function App() {
  const [date, setDate] = useState(new Date().toISOString());

  const handleChange = useCallback((event) => {
    setDate(event.target.value);
  }, [])

  return (
    <div>
      <DateTimeInput
        format="D tt"
        locale="fr"
        name="date"
        onChange={handleChange}
        showCalendarIcon
        showCalendarOnFocus
        showTimeZone
        showWeekNumbers
        value={date}
      />
    </div>
  )
}
```

### Props

#### `calendarIcon: string`

Allow to change the calendar icon in the input field.

#### `disabled: bool`

Set to `true` to avoid changes of the input value.

#### `format: string`

Allow to set a custom format for parsing/formatting the date in the input field.  
Formatting is based on
Luxon (https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens).  
The default value is `D tt` (localized date and time).

#### `locale: string`

Set the locale to use when displaying dates, month... (based on the **Intl API**).  
The default value is `navigator.language`.

Example of different locales (`fr-FR`, `ru`, `zh`):

![Calendar](docs/images/calendar_days_fr-FR.jpg)
![Calendar](docs/images/calendar_days_ru.jpg)
![Calendar](docs/images/calendar_days_zh.jpg)

#### `max: string`

Pass an ISO date string that is the maximal valid datetime.

Example with `2021-06-09T23:59:59.000-10:00`:

![Calendar](docs/images/calendar_days_max_en-US.jpg)

#### `min: string`

Pass an ISO date string that is the minimal valid datetime.

Example with `2021-06-09T00:00:00.000-10:00`:

![Calendar](docs/images/calendar_days_min_en-US.jpg)

#### `renderDay: function`

Pass a function or functional component to customize days rendering.

#### `showCalendarIcon: bool`

Set to `true` to display the calendar icon in the input field.

#### `showCalendarOnFocus: bool`

Set to `true` to open the calendar when the input receives the focus (by click or keyboard).

#### `showTimeZone: bool`

Set to `true` to display the current timezone in the calendar.

#### `showWeekNumbers: bool`

Set to `true` to display week numbers in the calendar.

#### `value: string`

Used to pass the date in the format defined with `format`.

## Customization

### `renderDay: function`

The example below shows how to disable selection of week-end days.

```js
import {
  CalendarDay,
  DateTimeInput
} from '@jalik/react-datetime-input';
import React, {
  useCallback,
  useState
} from 'react';

// Don't forget to load default styles.
import '@jalik/react-datetime-input/src/styles.css';

// Custom component that renders week-end days in red.
function CustomDayCell(props) {
  const { dateTime, currentMonth, selectedDateTime } = props;
  const isWeekEnd = dateTime.weekday > 5;
  const style = isWeekEnd ? { color: 'red' } : {};
  // We use the default component for rendering day, so we have less code to write.
  // But we could use another component with a complete different logic.
  return <CalendarDay {...props} style={style} />;
}

function App() {
  const [date, setDate] = useState(new Date().toISOString());

  const handleChange = useCallback((event) => {
    setDate(event.target.value);
  }, [])

  return (
    <div>
      <DateTimeInput
        name="date"
        onChange={handleChange}
        renderDay={CustomDayCell}
        value={date}
      />
    </div>
  )
}
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md).

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).
