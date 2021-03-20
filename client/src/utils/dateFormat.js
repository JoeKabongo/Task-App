/*
Format Date from date to Day, Month Date -> Fri, January 01
*/
export default function formatDate(taskDate) {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (isToday(taskDate)) {
    return 'Due Today';
  }
  if (isTomorrow(taskDate)) {
    return 'Due Tomorrow';
  }

  const date = taskDate.getDate();
  const dayOfTheWeek = days[taskDate.getDay()];
  const month = months[taskDate.getMonth()];
  const year = taskDate.getFullYear();
  const status = new Date() <= taskDate ? 'Due ' : 'Overdue ';
  const yearDisplay = new Date().getFullYear() === year ? '' : `, ${year}`;
  return `${status} ${dayOfTheWeek}, ${month}  ${date}${yearDisplay}`;
}

// check if this date is today
function isToday(date) {
  return areEqual(new Date(), date);
}

// check if this date is tomorrow
function isTomorrow(taskDate) {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return areEqual(taskDate, today);
}

// check if two date are equal
function areEqual(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
