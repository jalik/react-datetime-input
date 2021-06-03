/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

/**
 * Returns default language from browser.
 * @return {string|null}
 */
export function getDefaultLanguage() {
  return typeof navigator !== 'undefined' && typeof navigator.language !== 'undefined'
    ? navigator.language.substr(0, 2)
    : null;
}

/**
 * Returns the months list using a locale.
 * @param {string} locale
 * @param {'numeric','2-digit','long','short','narrow'} format
 * @return {string[]}
 */
export function getMonths(locale, format = 'short') {
  const dtf = new Intl.DateTimeFormat(locale, { month: format });
  const months = [];
  const date = new Date();

  for (let i = 0; i < 12; i += 1) {
    date.setMonth(i);
    months.push(dtf.format(date));
  }
  return months;
}

/**
 * Returns the weeks for a datetime.
 * todo add an argument to specify the week start day (Sun/Mon)
 * @param {DateTime} dateTime
 * @return {*[]}
 */
export function getWeeks(dateTime) {
  const monthStart = dateTime.startOf('month');
  const monthEnd = dateTime.endOf('month');
  const weekStart = monthStart.startOf('week');
  const weekEnd = monthEnd.endOf('week');
  const weeks = [];
  let day = weekStart;

  while (day <= weekEnd) {
    const { weekNumber } = day;
    const days = [];

    for (let i = 0; i < 7; i += 1) {
      const dateString = day.toISO();
      days.push({
        dateString,
        dateTime: day,
      });
      day = day.plus({ day: 1 });
    }
    weeks.push({ days, number: weekNumber });
  }
  return weeks;
}

/**
 * Returns the years list.
 * @param {number} year
 * @param {number} size
 * @return {number[]}
 */
export function getYears(year, size) {
  const years = [];
  const min = Math.floor(size / 2);
  const max = Math.ceil(size / 2) - 1;

  for (let i = -min; i <= max; i += 1) {
    years.push(year + i);
  }
  return years;
}

/**
 * Processes callback if event keys matches.
 * @param {Event} event
 * @param {string[]} keys
 * @param {function} callback
 */
export function handleKeys(event, keys, callback) {
  if (keys.indexOf(event.key) !== -1) {
    callback(event);
  }
}

/**
 * Returns an object from a styles string.
 * @param {string} str
 * @return {{}}
 */
export function stylesFromString(str) {
  const styles = {};
  str.split(';').forEach((rule) => {
    const [key, value] = rule.split(':', 1);
    styles[key] = value;
  });
  return styles;
}
