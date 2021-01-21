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
function isToday(date) {
  return isEqual(new Date(), date);
}
function isEqual(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

function isTomorrow(taskDate) {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return isEqual(taskDate, today);
}
