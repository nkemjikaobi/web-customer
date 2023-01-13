/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import moment from "moment";
import { checkPlurality, padWithString } from "./utils";
/**
 * Checks if a year is a leap year
 * [logic: Checks that Febriuary that year had 29 days]
 * https://stackoverflow.com/a/43819507/4931825
 * @param {int} year [The year to check]
 * @returns {bool} isLeapYear
 */
export const isLeapYear = (year: any) => {
  return new Date(year, 1, 29).getDate() === 29;
};

/**
 * Gets the number of days in a month
 * @param {int} month [The month to check => `1 (Jan) - 12 (December)`]
 * @param {int} year [The year the month falls in]
 * @returns {int} days
 */
export const getDaysInMonth = (month: any, year: any) => {
  if (month > 0 && month <= 12) {
    if (month === 2) {
      if (isLeapYear(year)) {
        return 29;
      }

      return 28;
    }

    // `(month - 1)` Forces month to confirm to zero index [0 - 11]
    // `... % 7` splits based on the month falling between (0 - 6)
    // `... % 2` determines whether it is even or odd
    // For Months 0 - 6 (Odd -> 31 | Even -> 30)
    // For Months 7 - 11 (Odd -> 30 | Even -> 31)
    return 31 - (((month - 1) % 7) % 2);
  }

  // Default to 30 (or Zero?)
  return 30;
};

export const parseDateTime = (dateTimeString: string) => {
  const dateTime: Date = new Date(dateTimeString.replace(/-/g, "/"));
  const dateTimeStrArr: Array<any> = dateTime
    .toLocaleDateString("en-us", {
      day: "numeric",
      month: "short",
      year: "2-digit",
      hour: "numeric",
      minute: "2-digit",
    })
    .split(",");

  const time = dateTimeStrArr.pop().split(" ").join("").split(":").join(".");

  if (
    // dateTimeStrArr === "Invalid Date" ||
    !Array.isArray(dateTimeStrArr) ||
    !dateTimeStrArr[0]
  ) {
    return dateTimeString;
  }
  const monthDay = dateTimeStrArr[0].split(" ");
  const year = dateTimeStrArr[1].trim();
  const month = monthDay[0];
  const day = monthDay[1];
  return `${day} ${month}, ${year} - ${time}`;
};

export const formatCountDownTimer = (dateString: string): string => {
  const today = moment(new Date());
  const endDate = moment(dateString);

  const timer = endDate.diff(today, "seconds");

  const days = Math.floor(timer / 86400);
  let remainder = timer % 86400;

  const hours = Math.floor(remainder / 3600);
  remainder %= 3600;

  const minutes = Math.floor(remainder / 60);
  remainder %= 60;

  const seconds = Math.floor(remainder);

  return `${days} day${
    days > 1 ? "s" : ""
  } - ${hours}hrs ${minutes}mins ${seconds}secs`;
};
