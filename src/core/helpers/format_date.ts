import { DateValue } from '@app/components';
import moment from 'moment';
import { config } from '@app/config';

export const formatDate = (dateValue: DateValue): string => {
  const date = new Date();
  date.setFullYear(dateValue.year);
  date.setMonth(dateValue.month);
  date.setDate(dateValue.day);
  const dateString = moment.unix(date.getTime() / 1000).format(config.dateFormat);
  return dateString;
};
