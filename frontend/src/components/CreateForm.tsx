import React, { useState } from 'react';

import { TextField, Button, Container, Grid, Typography } from '@mui/material';

import { CreateFormProps } from '../lib/definitions';

const CreateForm: React.FC<CreateFormProps> = ({ addReservation }) => {
  const [title, setTitle] = useState<string>('');
  const [startAt, setStartAt] = useState<string>('');
  const [endAt, setEndAt] = useState<string>('');
  const [titleError, setTitleError] = useState<string | null>(null);
  const [startAtError, setStartAtError] = useState<string | null>(null);
  const [endAtError, setEndAtError] = useState<string | null>(null);

  const validateForm = () => {
    let isValid = true;

    // Check if all fields are filled
    if (!title) {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (!startAt) {
      setStartAtError('Start date and time are required');
      isValid = false;
    } else {
      setStartAtError(null);
    }

    if (!endAt) {
      setEndAtError('End date and time are required');
      isValid = false;
    } else {
      setEndAtError(null);
    }

    // Check if startAt is in the future
    const now = new Date().toISOString().split('.')[0]; // Get current time in ISO format without milliseconds
    if (startAt < now) {
      setStartAtError('Start date and time must be in the future');
      isValid = false;
    }

    // Check if endAt is later than startAt
    if (endAt <= startAt) {
      setEndAtError('End date and time must be later than Start date and time');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const newReservation = {
        title,
        start_at: startAt,
        end_at: endAt,
      };

      addReservation(newReservation);

      setTitle('');
      setStartAt('');
      setEndAt('');
    }
  };

  return (
    <Container sx={{ my: '15px' }}>
      <Typography variant='overline'>Create Reservation</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          inputProps={{ 'data-testid': 'title-input' }}
          label='Title'
          variant='outlined'
          fullWidth
          margin='normal'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!titleError}
          helperText={titleError}
          required
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              inputProps={{ 'data-testid': 'start_at-input' }}
              label='Start At'
              type='datetime-local'
              variant='outlined'
              fullWidth
              margin='normal'
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!startAtError}
              helperText={startAtError}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputProps={{ 'data-testid': 'end_at-input' }}
              label='End At'
              type='datetime-local'
              variant='outlined'
              fullWidth
              margin='normal'
              value={endAt}
              onChange={(e) => setEndAt(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!endAtError}
              helperText={endAtError}
              required
            />
          </Grid>
        </Grid>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ marginTop: '15px' }}
          fullWidth
        >
          Add Reservation
        </Button>
      </form>
    </Container>
  );
};

export default CreateForm;
