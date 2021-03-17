import * as moment from 'moment';

const APP_DATE_FORMAT = `YYYY/M/D`;
const APP_DATE_FORMAT_2 = `YYYY-M-D`;
const APP_DATE_FORMAT_3 = `YYYY-MM-DDTHH:mm:ss[Z]`;

const APP_DATE_DISPLAY_FORMAT = `DD.MMM.YYYY`;

const ACCEPTED_DATE_FORMATS = [APP_DATE_FORMAT, APP_DATE_FORMAT_2];

const DATE_FORMAT_YYYYMMDD = `YYYY-MM-DD`;
const DATE_FORMAT_DDMMYY = `DD/MM/YYYY`;

const DEFAULT_NUMBER = 99999999999;

// 0-9
// https://regex101.com/r/dU0eY6/1
const GUESTS_REGEX = new RegExp(/^[0-9]$/);
// mm/dd/yyyy, m/d/yyyy
// https://regex101.com/r/7iSsmm/2
const DATE_REGEX = new RegExp(/^(\d{2}|\d)\/(\d{2}|\d)\/\d{4}$/);
// h:mm am/pm, hh:mm AM/PM
// https://regex101.com/r/j2Cfqd/1/
const TIME_REGEX = new RegExp(/^((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))$/);

// function isDateValid(value: string | Date): boolean {
//   if (
//     moment(value, APP_DATE_FORMAT, true).isValid() ||
//     moment(value, APP_DATE_FORMAT_2, true).isValid()
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

function isDateValid(value: string | Date): boolean {
  if (moment(value, [APP_DATE_FORMAT, APP_DATE_FORMAT_2, APP_DATE_FORMAT_3], true).isValid()) {
    return true;
  } else {
    return false;
  }
}


function formatDate(
  value: string | Date,
  format: string = DATE_FORMAT_YYYYMMDD
): string {
  return moment(value).format(format);
}

function formatdfd(value: string | Date): string {
  return moment(value).format(APP_DATE_DISPLAY_FORMAT);
}

function isFutureDate(
  firstDate: string | Date,
  secondDate: string | Date
): boolean {
  if (isDateValid(firstDate) && isDateValid(secondDate)) {
    const diffDays = dateDiffD(formatDate(firstDate), formatDate(secondDate));
    if (diffDays > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isPastDate(
  firstDate: string | Date,
  secondDate: string | Date
): boolean {
  if (isDateValid(firstDate) && isDateValid(secondDate)) {
    const diffDays = dateDiffD(formatDate(firstDate), formatDate(secondDate));
    if (diffDays < 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function getAge(currentDate: string | Date, dob: string | Date): number {
  return dateDiffY(formatDate(dob), formatDate(currentDate));
}

function dateDiffY(
  firstDate: string | Date,
  secondDate: string | Date
): number {
  if (isDateValid(firstDate) && isDateValid(secondDate)) {
    let fdate = moment(firstDate, APP_DATE_FORMAT);
    let sdate = moment(secondDate, APP_DATE_FORMAT);

    return moment(sdate).diff(fdate, 'years', false);
  } else {
    return DEFAULT_NUMBER;
  }
}

function dateDiffM(
  firstDate: string | Date,
  secondDate: string | Date
): number {
  if (isDateValid(firstDate) && isDateValid(secondDate)) {
    let fdate = moment(firstDate, APP_DATE_FORMAT);
    let sdate = moment(secondDate, APP_DATE_FORMAT).startOf('day');

    return moment(sdate).diff(fdate, 'months', false);
  } else {
    return DEFAULT_NUMBER;
  }
}

function dateDiffD(
  firstDate: string | Date,
  secondDate: string | Date
): number {
  if (isDateValid(firstDate) && isDateValid(secondDate)) {
    let fdate = moment(firstDate, ACCEPTED_DATE_FORMATS);
    let sdate = moment(secondDate, ACCEPTED_DATE_FORMATS).startOf('day');

    return moment(sdate).diff(fdate, 'days', false);
  } else {
    return DEFAULT_NUMBER;
  }
}

// Converts date + time strings to a Date object.
// Date and time parameters should have already
// been validated with DATE_REGEX and TIME_REGEX.
function stringsToDate(dateStr: string, timeStr: string) {
  if (!DATE_REGEX.test(dateStr) || !TIME_REGEX.test(timeStr)) {
    console.error('Cannot convert date/time to Date object.');
    return;
  }
  const date = new Date(dateStr);
  const timeArr = timeStr.split(/[\s:]+/); // https://regex101.com/r/H4dMvA/1
  let hour = parseInt(timeArr[0], 10);
  const min = parseInt(timeArr[1], 10);
  const pm = timeArr[2].toLowerCase() === 'pm';

  if (!pm && hour === 12) {
    hour = 0;
  }
  if (pm && hour < 12) {
    hour += 12;
  }
  date.setHours(hour);
  date.setMinutes(min);
  return date;
}

export {
  GUESTS_REGEX,
  DATE_REGEX,
  TIME_REGEX,
  DEFAULT_NUMBER,
  DATE_FORMAT_YYYYMMDD,
  DATE_FORMAT_DDMMYY,
  APP_DATE_FORMAT,
  APP_DATE_DISPLAY_FORMAT,
  ACCEPTED_DATE_FORMATS,
  APP_DATE_FORMAT_2,
  stringsToDate,
  isDateValid,
  dateDiffY,
  dateDiffM,
  dateDiffD,
  formatDate,
  formatdfd,
  isFutureDate,
  isPastDate,
  getAge
};
