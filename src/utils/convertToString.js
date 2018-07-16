import moment from 'moment';

export default function computeAgeString(dob) {
  const years = moment().diff(dob, 'years');
  const months = moment().diff(dob, 'months');
  const days = moment().diff(dob, 'days');

  if (years > 0) {
    return years + ' YRS';
  } else if (months > 0) {
    return months + ' MO';
  } else if (days >=0) {
    return days + ' DAYS';
  } else {
    return '';
  }
}
