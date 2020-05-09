export const roundFloat = n => Math.round(parseFloat(n));

const getTimeFormatted = unixDate => {
  const providedDate = new Date(unixDate * 1000);

  return `${providedDate.getHours()}:${
    providedDate.getMinutes() < 10
      ? `0${providedDate.getMinutes()}`
      : providedDate.getMinutes()
  }`;
};

export const toProperCase = str => {
  return str.replace(/(^|\s)\S/g, t => t.toUpperCase());
};

const getUNIXTimestamp = date => Math.round(date.getTime() / 1000);

export const getLocalTime = (timeZoneShift, timeToConvert = '') => {
  const date = new Date();
  const currentTimezoneOffsetMinutes = date.getTimezoneOffset();
  const milisecondsInSecond = 1000;
  let parsedTimeToConvert;

  if (timeToConvert) {
    parsedTimeToConvert = new Date(timeToConvert * 1000).getTime();
  } else {
    parsedTimeToConvert = Date.now();
  }

  const newLocalDate = new Date(
    parsedTimeToConvert +
      parseInt(timeZoneShift) * milisecondsInSecond +
      currentTimezoneOffsetMinutes * 60 * milisecondsInSecond
  );

  const UNIXTimestamp = getUNIXTimestamp(newLocalDate);

  return getTimeFormatted(UNIXTimestamp);
};

export const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};
