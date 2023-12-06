export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Paris',
  };
  return new Date(dateString).toLocaleString('en-GB', options);
};
