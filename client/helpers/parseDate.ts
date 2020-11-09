var months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Converts a string into a formatted date
 * @param date
 * @returns formatted date
 */
export default function parseDate(date: string | Date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const month = months[date.getMonth()];

  return `${month} ${date.getDay()}, ${date.getFullYear()}`;
}
