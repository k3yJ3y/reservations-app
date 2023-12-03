export const formatDate = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Europe/Paris',
    };
    return new Date(dateString).toLocaleString('en-GB', options);
  };

