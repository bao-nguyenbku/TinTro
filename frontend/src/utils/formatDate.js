import moment from 'moment/moment';

// *https://momentjs.com/ to know more about momentjs

export const formatDate = (date, format = 'LT') => {
  return moment(date).format(format);
};
