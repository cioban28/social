// Templates
const templates = Object.assign(
  {},
  {
    suffixAgo: 'ago',
    suffixFromNow: 'from now',
    seconds: 'less than a minute',
    minute: 'about a minute',
    minutes: '%d minutes',
    hour: 'an hour',
    hours: '%d hours',
    day: 'a day',
    days: '%d days',
    month: 'a month',
    months: '%d months',
    year: 'year',
    years: '%d years',
  },
  {
    prefix: '',
  }
);

const template = (t, n) => templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));

export const timeago = (time, convertVuukleServerDate = false) => {
  if (!time) {
    return;
  }

  // if we need to convert server UTC date to local time. Also adding UTC because it's not exist in response for date
  if (convertVuukleServerDate) {
    time = new Date(time * 1000);
    time = time.getTime();
  }

  const now = new Date();
  // tslint:disable-next-line
  const seconds = ((now.getTime() - time) * 0.001) >> 0;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;

  return (
    templates.prefix +
    ((seconds < 45 && template('seconds', seconds)) ||
      (seconds < 90 && template('minute', 1)) ||
      (minutes < 45 && template('minutes', minutes)) ||
      (minutes < 90 && template('hour', 1)) ||
      (hours < 24 && template('hours', hours)) ||
      (hours < 42 && template('day', 1)) ||
      (days < 30 && template('days', days)) ||
      (days < 45 && template('month', 1)) ||
      (days < 365 && template('months', days / 30)) ||
      (years < 1.5 && template('year', 1)) ||
      template('years', years)) +
    ` ${templates.suffixAgo}`
  );
};

// export const convertToUnixDate = () => {

// }
