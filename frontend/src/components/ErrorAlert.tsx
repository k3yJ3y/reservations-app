import React from 'react';

import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

import { ErrorAlertProps } from '../lib/definitions';

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, closeErr }) => {
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
