import moment from "moment";

/**
 * Formats a date string using moment.js
 * @param {any} input - The date input (ISO string, Firestore Timestamp, or Date object)
 * @param {('full'|'short'|'time')} [format='full'] - The format type to use
 * @returns {string} The formatted date string
 */
export const formatEventDate = (input, format = "full") => {
  if (!input) return "";

  let m;

  // ✅ Handle Firestore Timestamp
  if (input?.seconds) {
    m = moment.unix(input.seconds);
  } else {
    m = moment(input);
  }

  if (!m.isValid()) return "";

  const formats = {
    full: "dddd, D MMMM YYYY",
    short: "D MMMM YYYY",
    time: "HH:mm [hrs]",
  };

  return m.format(formats[format] || formats.full);
};
