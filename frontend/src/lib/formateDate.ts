import dayjs from 'dayjs';

export const formatDate = (iso: Date) => {
   return dayjs(iso).format('D MMM YYYY');
};
