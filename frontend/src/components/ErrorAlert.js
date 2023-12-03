import React from 'react';

import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

const ErrorAlert = ({ message, closeErr }) => {
  return (
    <Alert
      severity='error'
      variant='outlined'
      onClose={() => closeErr()}
      sx={{ m: '5px' }}
    >
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorAlert;
